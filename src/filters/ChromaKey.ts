import { clamp } from "lodash";
import {
	defaultFilter,
	IFilter,
	PartialFilterConstructor,
	Filter,
	FilterSuper,
} from "../OBSFilter";

export enum KeyColorType {
	Green = "green",
	Blue = "blue",
	Magenta = "magenta",
	Custom = "custom",
}

export type IChromaKeyFilter = IFilter & {
	settings: {
		opacity?: number;
		contrast?: number;
		brightness?: number;
		gamma?: number;

		key_color_type?: KeyColorType;
		key_color?: number;

		similarity?: number;
		smoothness?: number;
		spill?: number;
	};
};

const defaultChromaKeyFilter: IChromaKeyFilter = {
	...defaultFilter,
	id: "chroma_key_filter",
	versioned_id: "chroma_key_filter_v2",
};

interface ChromaKeyFilter extends Filter<IChromaKeyFilter> {
	setKeyColor(colorType: KeyColorType): void;
	setKeyColor(red: number, green: number, blue: number): void;
}

const ChromaKeyFilter = function (
	this: ChromaKeyFilter,
	data?: Partial<IChromaKeyFilter>
) {
	const prox = FilterSuper(this, {
		...defaultChromaKeyFilter,
		...data,
	});

	return prox;
} as unknown as PartialFilterConstructor<IChromaKeyFilter, ChromaKeyFilter>;

ChromaKeyFilter.prototype = Object.create(Filter.prototype);

ChromaKeyFilter.prototype.setKeyColor = function (
	this: ChromaKeyFilter,
	first: KeyColorType | number,
	green?: number,
	blue?: number
) {
	const rawData = this.toJSON();

	if (typeof first === "string") {
		rawData.settings.key_color_type = first;
		return;
	}

	rawData.settings.key_color_type = KeyColorType.Custom;

	const hexRed = Math.round(clamp(first, 0, 255));
	const hexGreen = Math.round(clamp(green as number, 0, 255));
	const hexBlue = Math.round(clamp(blue as number, 0, 255));

	rawData.settings.key_color =
		hexRed + hexGreen * 256 + hexBlue * 65536 + 255 * 16777216;
};

export { ChromaKeyFilter };
