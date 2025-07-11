import { cloneDeep } from "lodash";
import { IAudioSource, ITransition } from ".";
import { Scene, IScene } from "./OBSScene";
import { defaultSource, ISource, Source } from "./OBSSource";
import { IQuickTransition, Transition } from "./OBSTransition";
import { SourceKey, SourceMap } from "./sources/SourceMap";
import { createProxy } from "./util";

interface ISceneCollection {
	current_program_scene: string;
	current_scene: string;
	current_transition: string;

	groups: IScene[];

	modules: Record<string, unknown>;

	name: string;
	preview_locked: boolean;

	quick_transitions: IQuickTransition[];

	saved_projectors: unknown[];

	scaling_enabled: boolean;
	scaling_level: number;
	scaling_off_x: number;
	scaling_off_y: number;

	scene_order: {
		name: string;
	}[];

	sources: ISource[];

	transition_duration: number;
	transitions: ITransition[];
}

const defaultCollection: ISceneCollection = {
	current_program_scene: "",
	current_scene: "",
	current_transition: "Fade",

	groups: [],
	modules: {},

	name: "Scenes",

	preview_locked: false,
	quick_transitions: [],
	saved_projectors: [],

	scaling_enabled: false,
	scaling_level: 0,
	scaling_off_x: 0,
	scaling_off_y: 0,

	scene_order: [],
	sources: [],

	transition_duration: 300,
	transitions: [],
};

interface SceneCollection extends ISceneCollection {
	get scenes(): Scene[];
	set scenes(scenes: Scene[]);

	get sources(): Source[];
	set sources(sources: Source[]);

	get transitions(): Transition[];
	set transitions(transtitions: Transition[]);

	get current_program_scene(): string;
	set current_program_scene(scene: string);

	get scene_order(): { name: string }[];

	createSource<K extends SourceKey>(
		id: K,
		data?: ConstructorParameters<(typeof SourceMap)[K]>[0],
	): InstanceType<(typeof SourceMap)[K]>;
	createSource<T extends ISource>(id: string, data?: Partial<T>): Source<T>;
	createScene(data?: Partial<IScene>): Scene;

	toJSON(): ISceneCollection;
}

interface SceneCollectionConstructor {
	new (data?: Partial<ISceneCollection>): SceneCollection;
	(): void;
}

const SceneCollection = function (
	this: SceneCollection,
	data?: Partial<ISceneCollection>,
) {
	const rawData = cloneDeep({
		...defaultCollection,
		...data,
	});

	const scenes: Scene[] = [];
	const transitions: Transition[] = [];
	const sources: Source[] = [];

	Object.defineProperties(this, {
		scenes: {
			get: () => {
				return scenes;
			},
			set: (newScenes: Scene[]) => {
				scenes.splice(0, scenes.length, ...newScenes);
			},
		},

		sources: {
			get: () => {
				return sources;
			},
			set: (newSources: Source[]) => {
				sources.splice(0, sources.length, ...newSources);
			},
		},

		transitions: {
			get: () => {
				return transitions;
			},
			set: (newTransitions: Transition[]) => {
				transitions.splice(0, transitions.length, ...newTransitions);
			},
		},

		current_program_scene: {
			get: () => {
				if (rawData.current_program_scene) {
					return rawData.current_program_scene;
				}

				return (rawData.current_program_scene = this.scenes[0].name);
			},

			set: (sceneName: string) => {
				rawData.current_program_scene = sceneName;
			},
		},

		scene_order: {
			get: () => {
				const order = this.scenes.map((scene) => {
					return {
						name: scene.name,
					};
				});

				rawData.scene_order = order;

				return order;
			},

			set: (order: { name: string }[]) => {
				rawData.scene_order = order;
			},
		},
	});

	rawData.sources.forEach((source) => {
		if (source.id === "scene") {
			this.createScene(source as IScene);
			return;
		}
		this.createSource(source.id, source);
	});

	scenes.sort((a, b) => {
		const aIdx = rawData.scene_order.findIndex(
			(order) => order.name === a.name,
		);

		const bIdx = rawData.scene_order.findIndex(
			(order) => order.name === b.name,
		);

		return aIdx - bIdx;
	});

	rawData.transitions.forEach((transition) => {
		transitions.push(new Transition(transition));
	});

	this.toJSON = () => {
		rawData.sources = [
			...sources
				.filter((source) => source.exists())
				.map((source) => source.toJSON()),
			...scenes.map((scene) => scene.toJSON()),
		];

		if (!rawData.current_program_scene) {
			rawData.current_program_scene = scenes[0].name;
		}

		if (!rawData.current_scene) {
			rawData.current_scene = scenes[0].name;
		}

		rawData.scene_order = scenes.map((scene) => {
			return {
				name: scene.name,
			};
		});

		return rawData;
	};

	return createProxy(rawData, {
		get: (_target: any, prop: string | symbol) => {
			if (prop in this) return this[prop as keyof SceneCollection];
			return rawData[prop as keyof ISceneCollection];
		},
		set: (_target: any, prop: string | symbol, value: any) => {
			if (prop in this) {
				/* @ts-expect-error(reaching into internal data) */
				this[prop as keyof SceneCollection] = value;
				return true;
			}

			/* @ts-expect-error(reaching into internal data) */
			rawData[prop as keyof ISceneCollection] = value;
			return true;
		},
	});
} as unknown as SceneCollectionConstructor;

SceneCollection.prototype.createSource = function <T extends ISource>(
	this: SceneCollection,
	id: string,
	data?: Partial<T>,
): Source {
	let name = data?.name ?? "Source";
	let iter = 0;

	const sources = this.sources;

	while (
		sources.some(
			(source) => source.name === name + (iter ? ` ${iter + 1}` : ""),
		)
	) {
		++iter;
	}

	name += iter ? ` ${iter + 1}` : "";

	let source;
	if (id in SourceMap) {
		source = new SourceMap[id as SourceKey]({
			...data,
			name,
			id,
		} as IAudioSource);
	} else {
		source = new Source({
			...defaultSource,
			...data,
			name,
			id,
		});
	}

	source.addToCollection(this);

	this.sources.push(source);

	return source;
};

SceneCollection.prototype.createScene = function (
	this: SceneCollection,
	data: Partial<IScene>,
): Source {
	const scene = new Scene(data);
	scene.addToCollection(this);

	this.scenes.push(scene);

	return scene;
};

export { SceneCollection };
