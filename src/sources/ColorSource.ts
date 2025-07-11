import { clamp } from "lodash";
import {
	defaultSource,
	ISource,
	PartialSourceConstructor,
	Source,
	SourceSuper,
} from "../OBSSource";

export type IColorSource = ISource & {
	settings: {
		width?: number;
		height?: number;
		color?: number;
	};
};

const defaultColorSource: IColorSource = {
	...defaultSource,

	id: "color_source",
	versioned_id: "color_source_v3",
};

interface ColorSource extends Source<IColorSource> {
	setRGBA(red: number, green: number, blue: number, alpha: number): void;
}

const ColorSource = function (this: ColorSource, data?: Partial<IColorSource>) {
	const prox = SourceSuper(this, {
		...defaultColorSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<IColorSource, ColorSource>;

ColorSource.prototype = Object.create(Source.prototype);

ColorSource.prototype.setRGBA = function (
	this: ColorSource,
	red: number,
	green: number,
	blue: number,
	alpha: number
) {
	const rawData = this.toJSON();

	const hexRed = Math.round(clamp(red, 0, 255));
	const hexGreen = Math.round(clamp(green, 0, 255));
	const hexBlue = Math.round(clamp(blue, 0, 255));
	const hexAlpha = Math.floor(clamp(alpha, 0, 1) * 255);

	rawData.settings.color =
		hexRed + hexGreen * 256 + hexBlue * 65536 + hexAlpha * 16777216;
};

export { ColorSource };
