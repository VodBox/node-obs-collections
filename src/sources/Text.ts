import { clamp } from "lodash";
import {
	defaultSource,
	ISource,
	PartialSourceConstructor,
	Source,
	SourceSuper,
} from "../OBSSource";

export enum TextTransform {
	None,
	Uppercase,
	Lowercase,
	Startcase,
}

export enum Antialiasing {
	None,
	Standard,
}

export type ITextGDISource = {
	settings: {
		font?: {
			face: string;
			flags: number;
			size: number;
			style: string;
		};

		text?: string;

		read_from_file?: boolean;
		file?: string;

		color?: number;

		gradient?: boolean;
		gradient_color?: number;
		gradient_dir?: number;
		gradient_opacity?: number;

		align?: "left" | "center" | "right";
		valign?: "top" | "center" | "bottom";

		opacity?: number;

		bk_color?: number;
		bk_opacity?: number;

		vertical?: boolean;

		outline?: boolean;
		outline_size?: number;
		outline_color?: number;
		outline_opacity?: number;

		chatlog?: boolean;
		chatlog_lines?: number;

		extents?: boolean;
		extents_wrap?: boolean;
		extents_cx?: number;
		extents_cy?: number;

		transform?: TextTransform;
		antialiasing?: boolean;
	};
} & ISource;

const defaultTextGDISource: ITextGDISource = {
	...defaultSource,

	id: "text_gdiplus",
	versioned_id: "text_gdiplus_v2",
};

interface TextGDISource extends Source<ITextGDISource> {
	setRGBA(red: number, green: number, blue: number): void;
	setGradient(
		red1: number,
		green1: number,
		blue1: number,
		red2: number,
		green2: number,
		blue2: number,
		direction?: number,
	): void;
}

const TextGDISource = function (
	this: TextGDISource,
	data?: Partial<ITextGDISource>,
) {
	const prox = SourceSuper(this, {
		...defaultTextGDISource,
		...data,
	});

	this.setRGBA = (red, green, blue) => {
		const hexRed = Math.round(clamp(red, 0, 255));
		const hexGreen = Math.round(clamp(green, 0, 255));
		const hexBlue = Math.round(clamp(blue, 0, 255));

		prox.settings.color =
			hexRed + hexGreen * 256 + hexBlue * 65536 + 255 * 16777216;
	};

	this.setGradient = (
		red1,
		green1,
		blue1,
		red2,
		green2,
		blue2,
		direction = 0,
	) => {
		const hexRed1 = Math.round(clamp(red1, 0, 255));
		const hexGreen1 = Math.round(clamp(green1, 0, 255));
		const hexBlue1 = Math.round(clamp(blue1, 0, 255));
		const hexRed2 = Math.round(clamp(red2, 0, 255));
		const hexGreen2 = Math.round(clamp(green2, 0, 255));
		const hexBlue2 = Math.round(clamp(blue2, 0, 255));

		prox.settings.color =
			hexRed1 + hexGreen1 * 256 + hexBlue1 * 65536 + 255 * 16777216;

		prox.settings.gradient_color =
			hexRed2 + hexGreen2 * 256 + hexBlue2 * 65536 + 255 * 16777216;

		prox.settings.gradient_dir = direction;
	};

	return prox;
} as unknown as PartialSourceConstructor<ITextGDISource, TextGDISource>;

TextGDISource.prototype = Object.create(Source.prototype);

export type ITextFT2Source = {
	settings: {
		font?: {
			face: string;
			flags: number;
			size: number;
			style: string;
		};

		text?: string;

		from_file?: boolean;
		text_file?: string;

		color1?: number;
		color2?: number;

		outline?: boolean;
		drop_shadow?: boolean;

		log_mode?: boolean;
		log_lines?: number;

		word_wrap?: boolean;
		custom_width?: number;

		antialiasing?: boolean;
	};
} & ISource;

const defaultTextFT2Source: ITextFT2Source = {
	...defaultSource,

	id: "text_ft2_source",
	versioned_id: "text_ft2_source_v2",

	settings: {},
};

interface TextFT2Source extends Source<ITextGDISource> {
	setRGBA(red: number, green: number, blue: number): void;
	setRGBA(red: number, green: number, blue: number, alpha: number): void;
	setGradient(
		red1: number,
		green1: number,
		blue1: number,
		red2: number,
		green2: number,
		blue2: number,
	): void;
	setGradient(
		red1: number,
		green1: number,
		blue1: number,
		alpha1: number,
		red2: number,
		green2: number,
		blue2: number,
		alpha2: number,
	): void;
}

const TextFT2Source = function (
	this: TextFT2Source,
	data?: Partial<ITextFT2Source>,
) {
	const prox = SourceSuper(this, {
		...defaultTextFT2Source,
		...data,
	});

	this.setRGBA = (red, green, blue, alpha: number = 255) => {
		const hexRed = Math.round(clamp(red, 0, 255));
		const hexGreen = Math.round(clamp(green, 0, 255));
		const hexBlue = Math.round(clamp(blue, 0, 255));
		const hexAlpha = Math.floor(clamp(alpha, 0, 1) * 255);

		const color =
			hexRed + hexGreen * 256 + hexBlue * 65536 + hexAlpha * 16777216;

		prox.settings.color = color;
		prox.settings.color2 = color;
	};

	this.setGradient = (
		red1,
		green1,
		blue1,
		alpha1,
		red2,
		green2,
		blue2?: number,
		alpha2?: number,
	) => {
		if (blue2 === undefined || alpha2 === undefined) {
			alpha2 = 255;
			blue2 = green2;
			green2 = red2;
			red2 = alpha1;
			alpha1 = 255;
		}

		const hexRed1 = Math.round(clamp(red1, 0, 255));
		const hexGreen1 = Math.round(clamp(green1, 0, 255));
		const hexBlue1 = Math.round(clamp(blue1, 0, 255));
		const hexAlpha1 = Math.round(clamp(alpha1, 0, 255));
		const hexRed2 = Math.round(clamp(red2, 0, 255));
		const hexGreen2 = Math.round(clamp(green2, 0, 255));
		const hexBlue2 = Math.round(clamp(blue2, 0, 255));
		const hexAlpha2 = Math.round(clamp(alpha2, 0, 255));

		prox.settings.color =
			hexRed1 + hexGreen1 * 256 + hexBlue1 * 65536 + hexAlpha1 * 16777216;

		prox.settings.color2 =
			hexRed2 + hexGreen2 * 256 + hexBlue2 * 65536 + hexAlpha2 * 16777216;
	};

	return prox;
} as unknown as PartialSourceConstructor<ITextFT2Source, TextFT2Source>;

TextFT2Source.prototype = Object.create(Source.prototype);

export { TextGDISource, TextGDISource as TextSource, TextFT2Source };
