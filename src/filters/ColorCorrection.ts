import {
	defaultFilter,
	IFilter,
	PartialFilterConstructor,
	Filter,
	FilterSuper,
} from "../OBSFilter";

export type IColorCorrectionFilter = IFilter & {
	settings: {
		gamma?: number;
		contrast?: number;
		brightness?: number;
		saturation?: number;
		hue_shift?: number;
		opacity?: number;

		color_multiply?: number;
		color_add?: number;
	};
};

const defaultColorCorrectionFilter: IColorCorrectionFilter = {
	...defaultFilter,
	id: "color_filter",
	versioned_id: "color_filter_v2",
};

type ColorCorrectionFilter = Filter<IColorCorrectionFilter>;

const ColorCorrectionFilter = function (
	this: ColorCorrectionFilter,
	data?: Partial<IColorCorrectionFilter>,
) {
	const prox = FilterSuper(this, {
		...defaultColorCorrectionFilter,
		...data,
	});

	return prox;
} as unknown as PartialFilterConstructor<
	IColorCorrectionFilter,
	ColorCorrectionFilter
>;

ColorCorrectionFilter.prototype = Object.create(Filter.prototype);

export { ColorCorrectionFilter };
