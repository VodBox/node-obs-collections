import { cloneDeep } from "lodash";
import { IHotkey } from ".";
import {
	defaultSource,
	ISource,
	PartialSourceConstructor,
	Source,
	SourceSuper,
} from "./OBSSource";
import { IQuickTransition } from "./OBSTransition";
import { createProxy } from "./util";

export type IScene = ISource & {
	settings: {
		custom_size: boolean;
		id_counter: number;
		items: ISceneItem[];
	};
};

export const defaultScene: IScene = {
	...defaultSource,

	name: "Scene",
	id: "scene",

	settings: {
		custom_size: false,
		id_counter: 0,
		items: [],
	},

	hotkeys: {
		"OBSBasic.SelectScene": [],
	},
};

interface SceneHotkeys {
	select: IHotkey[];
}

type Scene = {
	addSource(source: Source<any>): SceneItem;
	duplicateSceneItem(item: SceneItem): SceneItem;

	idCounter: number;

	get sceneItems(): SceneItem[];
	set sceneItems(items: SceneItem[]);

	get hotkeys(): SceneHotkeys;
	set hotkeys(keys: SceneHotkeys);
} & Source<IScene>;

const Scene = function (this: Scene, data?: Partial<IScene>) {
	const prox = SourceSuper(this, {
		...defaultScene,
		...data,
	});

	const parentJSON = this.toJSON;

	const rawData = parentJSON.call(this);

	const sceneItems: SceneItem[] = [];

	this.idCounter = prox.settings.items.reduce(
		(prev, item) => Math.max(prev, item.id + 1),
		0
	);

	const testSceneItem = (item: SceneItem) => {
		if (item.scene !== this) return;

		if (sceneItems.find((sceneItem) => sceneItem === item)) return;

		while (sceneItems.find((sceneItem) => sceneItem.id === item.id)) {
			++item.id;
		}
	};

	prox.settings.items.forEach((item) => {
		const sItem = CreateSceneItem(this, item);
		sItem.hotkeys = {
			hide: prox.hotkeys[`libobs.hide_scene_item.${item.id}`],
			show: prox.hotkeys[`libobs.show_scene_item.${item.id}`],
		};
		testSceneItem(sItem);
		sceneItems.push(sItem);
	});

	Object.defineProperty(this, "sceneItems", {
		get: () => {
			return createProxy(sceneItems, {
				set: (target, prop, value: SceneItem, _receiver) => {
					testSceneItem(value);
					target[prop as unknown as number] = value;
					return true;
				},
			});
		},
		set: (newItems: SceneItem[]) => {
			const items = this.sceneItems;
			items.splice(0, items.length, ...newItems);
		},
	});

	Object.defineProperty(this, "hotkeys", {
		get: () => {
			return {
				select: rawData.hotkeys["OBSBasic.SelectScene"],
			};
		},
		set: (keys: IHotkey[]) => {
			rawData.hotkeys["OBSBasic.SelectScene"] = keys;
		},
	});

	this.toJSON = () => {
		rawData.settings.items = sceneItems.map((item) => {
			return item.toJSON();
		});

		rawData.settings.id_counter = this.idCounter;

		rawData.hotkeys = {
			"OBSBasic.SelectScene": rawData.hotkeys["OBSBasic.SelectScene"],
			...sceneItems.reduce((prev, curr) => {
				prev[`libobs.hide_scene_item.${curr.name}`] = curr.hotkeys.hide;
				prev[`libobs.show_scene_item.${curr.name}`] = curr.hotkeys.show;

				return prev;
			}, {} as Record<string, IHotkey[]>),
		};

		return parentJSON.call(this);
	};

	return prox;
} as unknown as PartialSourceConstructor<IScene, Scene>;

Scene.prototype = Object.create(Source.prototype);

Scene.prototype.addSource = function (this: Scene, source: Source): SceneItem {
	const item = CreateSceneItem(this, {
		name: source.name,
		id: this.idCounter++,
	});

	this.sceneItems.push(item);

	return item;
};

Scene.prototype.duplicateSceneItem = function (
	this: Scene,
	item: SceneItem
): SceneItem {
	const newItem = CreateSceneItem(this, {
		...cloneDeep(item.toJSON()),
		id: this.idCounter++,
	});

	this.sceneItems.push(newItem);

	return item;
};

export { Scene };

type ScaleFilter = "disable";

export interface ISceneItem {
	align: number;

	bounds: {
		x: number;
		y: number;
	};
	bounds_align: number;
	bounds_type: number;

	crop_bottom: number;
	crop_left: number;
	crop_right: number;
	crop_top: number;

	group_item_backup: boolean;
	hide_transition: IQuickTransition;

	id: number;
	locked: boolean;
	name: string;

	pos: {
		x: number;
		y: number;
	};

	private_settings: Record<string, unknown>;

	rot: number;

	scale: {
		x: number;
		y: number;
	};

	scale_filter: ScaleFilter;

	show_transition: IQuickTransition;

	visible: boolean;
}

const defaultSceneItem: ISceneItem = {
	align: 5,
	bounds: {
		x: 0.0,
		y: 0.0,
	},
	bounds_align: 0,
	bounds_type: 0,
	crop_bottom: 0,
	crop_left: 0,
	crop_right: 0,
	crop_top: 0,
	group_item_backup: false,
	hide_transition: {
		duration: 0,
	},
	id: 0,
	locked: false,
	name: "",
	pos: {
		x: 0.0,
		y: 0.0,
	},
	private_settings: {},
	rot: 0.0,
	scale: {
		x: 1.0,
		y: 1.0,
	},
	scale_filter: "disable",
	show_transition: {
		duration: 0,
	},
	visible: true,
};

interface SceneItemHotkeys {
	show: IHotkey[];
	hide: IHotkey[];
}

interface SceneItem extends ISceneItem {
	scene: Scene;

	get hotkeys(): SceneItemHotkeys;
	set hotkeys(keys: SceneItemHotkeys);

	apply(data: Partial<ISceneItem>): void;
	toJSON(): ISceneItem;
}

interface SceneItemConstructor {
	new (scene: Scene, data: ISceneItem): SceneItem;
	(): void;
}

const SceneItem = function (this: SceneItem, scene: Scene, data: ISceneItem) {
	this.scene = scene;

	const rawData = cloneDeep(data);

	const hotkeys: SceneItemHotkeys = {
		show: [],
		hide: [],
	};

	Object.defineProperties(this, {
		hotkeys: {
			get: () => {
				return createProxy(hotkeys, {
					set: (
						_target: any,
						prop: string | symbol,
						value: any,
						_receiver
					) => {
						if (prop === "show") {
							hotkeys.show.splice(
								0,
								hotkeys.show.length,
								...(value as IHotkey[])
							);
							return true;
						}

						if (prop === "hide") {
							hotkeys.hide.splice(
								0,
								hotkeys.hide.length,
								...(value as IHotkey[])
							);
							return true;
						}

						hotkeys[prop as keyof SceneItemHotkeys] = value;
						return true;
					},
				});
			},
			set: (keys: SceneItemHotkeys) => {
				hotkeys.show.splice(0, hotkeys.show.length, ...keys.show);
				hotkeys.hide.splice(0, hotkeys.hide.length, ...keys.hide);
			},
		},
	});

	this.apply = (data: Partial<ISceneItem>) => {
		Object.assign(rawData, cloneDeep(data));
	};

	this.toJSON = () => rawData;

	return createProxy(rawData, {
		get: (_target: any, prop: string | symbol, _receiver: any) => {
			if (prop in this) return this[prop as keyof SceneItem];
			return rawData[prop as keyof ISceneItem];
		},
		set: (
			_target: any,
			prop: string | symbol,
			value: any,
			_receiver: any
		) => {
			if (prop in this) {
				/* @ts-ignore */
				this[prop as keyof SceneItem] = value;
				return true;
			}

			/* @ts-ignore */
			rawData[prop as keyof ISceneItem] = value;
			return true;
		},
	});
} as unknown as SceneItemConstructor;

function CreateSceneItem(scene: Scene, data: Partial<ISceneItem>) {
	return new SceneItem(scene, {
		...defaultSceneItem,
		...data,
	});
}
