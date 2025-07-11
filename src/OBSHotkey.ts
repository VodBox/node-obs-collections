import { cloneDeep } from "lodash";
import { createProxy } from ".";
import { Key } from "./OBSKeys";

export interface IHotkey {
	control?: boolean;
	alt?: boolean;
	shift?: boolean;
	command?: boolean;

	key: Key;
}

export const defaultHotkey: IHotkey = {
	key: Key.OBS_KEY_NONE,
};

interface Hotkey extends IHotkey {
	apply(data: Partial<IHotkey>): void;
	toJSON(): IHotkey;
}

const Hotkey = function (this: Hotkey, data: Partial<IHotkey>) {
	const rawData: IHotkey = cloneDeep({
		...defaultHotkey,
		...data,
	});

	this.apply = (raw: Partial<IHotkey>) => {
		Object.assign(rawData, cloneDeep(raw));
	};

	this.toJSON = () => rawData;

	return createProxy(rawData, {
		get: (_target: any, prop: string | symbol, _receiver: any) => {
			if (prop in this) return this[prop as keyof Hotkey];
			return rawData[prop as keyof IHotkey];
		},
	});
};

export { Hotkey };
