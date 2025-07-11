import {
	defaultFilter,
	IFilter,
	PartialFilterConstructor,
	Filter,
	FilterSuper,
} from "../OBSFilter";

export type ISharpenFilter = IFilter & {
	settings: {
		sharpness?: number;
	};
};

const defaultSharpenFilter: ISharpenFilter = {
	...defaultFilter,
	id: "sharpness_filter",
};

type SharpenFilter = Filter<ISharpenFilter>;

const SharpenFilter = function (
	this: SharpenFilter,
	data?: Partial<ISharpenFilter>,
) {
	const prox = FilterSuper(this, {
		...defaultSharpenFilter,
		...data,
	});

	return prox;
} as unknown as PartialFilterConstructor<ISharpenFilter, SharpenFilter>;

SharpenFilter.prototype = Object.create(Filter.prototype);

export { SharpenFilter };
