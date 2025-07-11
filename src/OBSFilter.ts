import { PartialSourceConstructor, Source } from ".";
import { ISource } from "./OBSSource";

export type IFilter = Omit<ISource, "filters"> & {
	filters?: never;
};

export const defaultFilter: IFilter = {
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
	name: "Filter",
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

type Filter<T extends IFilter = IFilter> = Omit<Source<T>, "filters">;

const Filter = function <T extends IFilter>(this: Filter, data?: T) {
	/* @ts-ignore */
	return Source.call(this, data) as Filter<T>;
} as unknown as PartialSourceConstructor<IFilter, Filter>;

Filter.prototype = Object.create(Source.prototype);

export { Filter };

export const FilterSuper = function <T extends IFilter>(
	thisArg: Filter<T>,
	data: T
) {
	/* @ts-ignore */
	return Filter.call(thisArg, data) as Filter<T>;
};

export { PartialSourceConstructor as PartialFilterConstructor };
