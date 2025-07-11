import {
	defaultSource,
	ISource,
	PartialSourceConstructor,
	Source,
	SourceSuper,
} from "../OBSSource";

export type ISyphonClientSource = ISource & {
	settings: {
		application?: string;

		uuid?: string;

		allow_transparency?: boolean;

		inject?: boolean;

		crop?: boolean;

		"crop.origin.x"?: number;
		"crop.origin.y"?: number;
		"crop.size.width"?: number;
		"crop.size.height"?: number;
	};
};

const defaultSyphonSource: ISyphonClientSource = {
	...defaultSource,
	id: "syphon-input",
};

type SyphonClientSource = Source<ISyphonClientSource>;

const SyphonClientSource = function (
	this: SyphonClientSource,
	data?: Partial<ISyphonClientSource>,
) {
	const prox = SourceSuper(this, {
		...defaultSyphonSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	ISyphonClientSource,
	SyphonClientSource
>;

SyphonClientSource.prototype = Object.create(Source.prototype);

export { SyphonClientSource };
