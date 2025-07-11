import {
	defaultSource,
	ISource,
	PartialSourceConstructor,
	Source,
	SourceSuper,
} from "../OBSSource";

export enum WinCaptureMethod {
	Auto,
	BitBlt,
	WGC,
}

export enum WinCapturePriority {
	Title,
	Class,
	Exe,
}

export type IWinWindowCaptureSource = ISource & {
	settings: {
		window?: string;
		method?: WinCaptureMethod;
		priority?: WinCapturePriority;

		cursor?: boolean;
		compatibility?: boolean;
		client_area?: boolean;
	};
};

const defaultWinWindowSource: IWinWindowCaptureSource = {
	...defaultSource,
	id: "window_capture",
};

interface WinWindowCaptureSource extends Source<IWinWindowCaptureSource> {}

const WinWindowCaptureSource = function (
	this: WinWindowCaptureSource,
	data?: Partial<IWinWindowCaptureSource>
) {
	const prox = SourceSuper(this, {
		...defaultWinWindowSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IWinWindowCaptureSource,
	WinWindowCaptureSource
>;

WinWindowCaptureSource.prototype = Object.create(Source.prototype);

export type IMacWindowCaptureSource = ISource & {
	settings: {
		window?: string;
		show_empty_names?: boolean;

		soft_shadow?: boolean;
	};
};

const defaultMacWindowSource: IMacWindowCaptureSource = {
	...defaultSource,
	id: "window_capture",
};

interface MacWindowCaptureSource extends Source<IMacWindowCaptureSource> {}

const MacWindowCaptureSource = function (
	this: MacWindowCaptureSource,
	data?: Partial<IMacWindowCaptureSource>
) {
	const prox = SourceSuper(this, {
		...defaultMacWindowSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IMacWindowCaptureSource,
	MacWindowCaptureSource
>;

MacWindowCaptureSource.prototype = Object.create(Source.prototype);

export type IXCompWindowCaptureSource = ISource & {
	settings: {
		capture_window?: string;

		cut_top?: number;
		cut_left?: number;
		cut_right?: number;
		cut_bot?: number;

		swap_redblue?: boolean;
		lock_x?: boolean;

		show_cursor?: boolean;
		include_border?: boolean;
		exclude_alpha?: boolean;
	};
};

const defaultXCompWindowSource: IXCompWindowCaptureSource = {
	...defaultSource,
	id: "xcomposite_input",
};

interface XCompWindowCaptureSource extends Source<IXCompWindowCaptureSource> {}

const XCompWindowCaptureSource = function (
	this: XCompWindowCaptureSource,
	data?: Partial<IXCompWindowCaptureSource>
) {
	const prox = SourceSuper(this, {
		...defaultXCompWindowSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IXCompWindowCaptureSource,
	XCompWindowCaptureSource
>;

XCompWindowCaptureSource.prototype = Object.create(Source.prototype);

export {
	WinWindowCaptureSource,
	WinWindowCaptureSource as WindowCaptureSource,
	MacWindowCaptureSource,
	XCompWindowCaptureSource,
};
