import { cloneDeep } from "lodash";
import { Hotkey } from ".";
import { FilterKey, FilterMap } from "./filters/FilterMap";
import { SceneCollection } from "./OBSCollection";
import { Filter, IFilter } from "./OBSFilter";
import { IHotkey } from "./OBSHotkey";
import type { SourceKey } from "./sources/SourceMap";
import { createProxy } from "./util";

export interface ISource {
	balance: number;
	deinterlace_field_order: number;
	deinterlace_mode: number;
	enabled: boolean;

	filters?: Filter[];

	flags: number;

	hotkeys: Record<string, IHotkey[]>;

	id: SourceKey | string;
	mixers: number;
	monitoring_type: number;
	muted: boolean;
	name: string;

	prev_ver: number;
	private_settings: Record<string, unknown>;

	"push-to-mute": boolean;
	"push-to-mute-delay": number;
	"push-to-talk": boolean;
	"push-to-talk-delay": number;

	settings: Record<string, unknown>;

	sync: number;
	versioned_id?: string;
	volume: number;
}

export type IAudioSource = ISource & {
	hotkeys: {
		"libobs.mute": IHotkey[];
		"libobs.unmute": IHotkey[];

		"libobs.push-to-mute": IHotkey[];
		"libobs.push-to-talk": IHotkey[];
	};
};

export const defaultSource: ISource = {
	balance: 0.5,
	deinterlace_field_order: 0,
	deinterlace_mode: 0,
	enabled: true,
	flags: 0,

	hotkeys: {},

	id: "null",
	mixers: 0,
	monitoring_type: 0,

	muted: false,
	name: "Source",
	prev_ver: 0,
	private_settings: {},

	"push-to-mute": false,
	"push-to-mute-delay": 0,
	"push-to-talk": false,
	"push-to-talk-delay": 0,

	settings: {},

	sync: 0,
	volume: 1.0,
};

type Source<T extends ISource = ISource> = T & {
	collection: SceneCollection | null;

	apply(data: Partial<T>): void;
	toJSON(): T;

	exists(): boolean;

	createFilter<K extends FilterKey>(
		id: K,
		data?: ConstructorParameters<(typeof FilterMap)[K]>[0],
	): InstanceType<(typeof FilterMap)[K]>;
	createFilter<T extends IFilter>(id: string, data?: Partial<T>): Filter<T>;

	addToCollection(collection: SceneCollection): void;
};

export type PartialSourceConstructor<T extends ISource, R extends Source> = {
	new (data?: Partial<T>): R;
	(): void;
};

export interface SourceConstructor {
	new <T extends ISource>(data: T): Source<T>;
	(): void;
}

const Source = function <T extends ISource>(this: Source<T>, data: T) {
	const rawData: T = cloneDeep({
		...defaultSource,
		...data,
	});

	this.collection = null;

	this.apply = (raw: Partial<T>) => {
		Object.assign(rawData, cloneDeep(raw));
	};

	this.toJSON = () => rawData;

	return createProxy(rawData, {
		get: (_target: any, prop: string | symbol) => {
			if (prop in this) return this[prop as keyof Source<T>];
			return rawData[prop as keyof T];
		},
		set: (_target: any, prop: string | symbol, value: any) => {
			if (prop in this) {
				this[prop as keyof Source<T>] = value;
				return true;
			}

			rawData[prop as keyof T] = value;
			return true;
		},
	});
} as SourceConstructor;

Source.prototype.addToCollection = function (
	this: Source,
	collection: SceneCollection,
) {
	this.collection = collection;
};

Source.prototype.exists = function (this: Source) {
	const rawData = this.toJSON();

	if (this.collection === null) return false;

	return this.collection.scenes.some((scene) =>
		scene.sceneItems.some((item) => item.name === rawData.name),
	);
};

type AudioSource<T extends IAudioSource = IAudioSource> = Source<T> & {
	setPushToTalk(...keys: Hotkey[]): void;
	addPushToTalk(...keys: Hotkey[]): void;

	setPushToMute(...keys: Hotkey[]): void;
	addPushToMute(...keys: Hotkey[]): void;

	setMute(...keys: Hotkey[]): void;
	setUnmute(...keys: Hotkey[]): void;
	addMute(...keys: Hotkey[]): void;
	addUnmute(...keys: Hotkey[]): void;
};

export const defaultAudioSource: IAudioSource = {
	...defaultSource,

	hotkeys: {
		"libobs.mute": [],
		"libobs.push-to-mute": [],
		"libobs.push-to-talk": [],
		"libobs.unmute": [],
	},
};

const AudioSource = function <T extends IAudioSource>(
	this: AudioSource<T>,
	data?: T,
) {
	/* @ts-expect-error(This kind of indirect call blows up TS for some reason.) */
	return Source.call(this, data) as AudioSource<T>;
};

AudioSource.prototype = Object.create(Source.prototype);

AudioSource.prototype.addMute = function (
	this: AudioSource,
	...keys: IHotkey[]
) {
	const rawData = this.toJSON();

	if (!rawData.hotkeys["libobs.mute"]) rawData.hotkeys["libobs.mute"] = [];

	const hotkeys = rawData.hotkeys["libobs.mute"];

	hotkeys.push(...keys);
};

AudioSource.prototype.setMute = function (
	this: AudioSource,
	...keys: IHotkey[]
) {
	const rawData = this.toJSON();

	rawData.hotkeys["libobs.mute"] = keys;
};

AudioSource.prototype.addUnmute = function (
	this: AudioSource,
	...keys: IHotkey[]
) {
	const rawData = this.toJSON();

	if (!rawData.hotkeys["libobs.unmute"])
		rawData.hotkeys["libobs.unmute"] = [];

	const hotkeys = rawData.hotkeys["libobs.unmute"];

	hotkeys.push(...keys);
};

AudioSource.prototype.setUnmute = function (
	this: AudioSource,
	...keys: IHotkey[]
) {
	const rawData = this.toJSON();

	rawData.hotkeys["libobs.unmute"] = keys;
};

AudioSource.prototype.addPushToMute = function (
	this: AudioSource,
	...keys: IHotkey[]
) {
	const rawData = this.toJSON();

	if (!rawData.hotkeys["libobs.push-to-mute"])
		rawData.hotkeys["libobs.push-to-mute"] = [];

	const hotkeys = rawData.hotkeys["libobs.push-to-mute"];

	hotkeys.push(...keys);
};

AudioSource.prototype.setPushToMute = function (
	this: AudioSource,
	...keys: IHotkey[]
) {
	const rawData = this.toJSON();

	rawData.hotkeys["libobs.push-to-mute"] = keys;
};

AudioSource.prototype.addPushToTalk = function (
	this: AudioSource,
	...keys: IHotkey[]
) {
	const rawData = this.toJSON();

	if (!rawData.hotkeys["libobs.push-to-talk"])
		rawData.hotkeys["libobs.push-to-talk"] = [];

	const hotkeys = rawData.hotkeys["libobs.push-to-talk"];

	hotkeys.push(...keys);
};

AudioSource.prototype.setPushToTalk = function (
	this: AudioSource,
	...keys: IHotkey[]
) {
	const rawData = this.toJSON();

	rawData.hotkeys["libobs.push-to-talk"] = keys;
};

export { Source, AudioSource };

export const SourceSuper = function <T extends ISource>(
	thisArg: Source<T>,
	data: T,
) {
	/* @ts-expect-error(This kind of indirect call blows up TS for some reason.) */
	return Source.call(thisArg, data) as Source<T>;
};

export const AudioSourceSuper = function <T extends IAudioSource>(
	thisArg: AudioSource<T>,
	data: T,
) {
	return AudioSource.call(thisArg, data) as AudioSource<T>;
};
