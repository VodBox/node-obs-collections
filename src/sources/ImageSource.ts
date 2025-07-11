import {
	defaultSource,
	ISource,
	PartialSourceConstructor,
	Source,
	SourceSuper,
} from "../OBSSource";

export type IImageSource = ISource & {
	settings: {
		file?: string;
		unload?: boolean;
		linear_alpha?: boolean;
	};
};

const defaultImageSource: IImageSource = {
	...defaultSource,

	id: "image_source",
};

type ImageSource = Source<IImageSource>;

const ImageSource = function (this: ImageSource, data?: Partial<IImageSource>) {
	const prox = SourceSuper(this, {
		...defaultImageSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<IImageSource, ImageSource>;

ImageSource.prototype = Object.create(Source.prototype);

export { ImageSource };
