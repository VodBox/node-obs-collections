import { cloneDeep } from "lodash";
import { createProxy, SceneCollection } from ".";
import { IHotkey } from "./OBSHotkey";
import { TransitionKey } from "./transitions/TransitionMap";

export interface IQuickTransition {
	duration: number;
	fade_to_black?: boolean;
	hotkeys?: IHotkey[];
	id?: number;
	name?: string;
}

export interface ITransition {
	id: TransitionKey | string;
	name: string;
	settings: Record<string, unknown>;
}

export const defaultTransition: ITransition = {
	id: "null",
	name: "Transition",
	settings: {},
};

export interface PartialTransitionConstructor {
	new <T extends ITransition>(data?: Partial<T>): Transition<T>;
	(): void;
}

export interface TransitionConstructor {
	new <T extends ITransition>(data: T): Transition<T>;
	(): void;
}

type Transition<T extends ITransition = ITransition> = T & {
	collection: SceneCollection | null;

	apply(data: Partial<T>): void;
	toJSON(): T;

	addToCollection(collection: SceneCollection): void;
};

const Transition = function <T extends ITransition>(
	this: Transition<T>,
	data: T,
) {
	const rawData: T = cloneDeep({
		...defaultTransition,
		...data,
	});

	this.apply = (raw: Partial<T>) => {
		Object.assign(rawData, cloneDeep(raw));
	};

	this.toJSON = () => rawData;

	return createProxy(rawData, {
		get: (_target: any, prop: string | symbol) => {
			if (prop in this) return this[prop as keyof Transition<T>];
			return rawData[prop as keyof T];
		},
	});
} as unknown as TransitionConstructor;

export { Transition };
