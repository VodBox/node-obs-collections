import {
	defaultFilter,
	IFilter,
	PartialFilterConstructor,
	Filter,
	FilterSuper,
} from "../OBSFilter";

export type IApplyLUTFilter = IFilter & {
	settings: {
		image_path?: string;
		clut_amount?: number;
	};
};

const defaultApplyLUTFilter: IApplyLUTFilter = {
	...defaultFilter,
	id: "clut_filter",
};

type ApplyLUTFilter = Filter<IApplyLUTFilter>;

const ApplyLUTFilter = function (
	this: ApplyLUTFilter,
	data?: Partial<IApplyLUTFilter>,
) {
	const prox = FilterSuper(this, {
		...defaultApplyLUTFilter,
		...data,
	});

	return prox;
} as unknown as PartialFilterConstructor<IApplyLUTFilter, ApplyLUTFilter>;

ApplyLUTFilter.prototype = Object.create(Filter.prototype);

export { ApplyLUTFilter };
