import {
	defaultSource,
	ISource,
	PartialSourceConstructor,
	Source,
	SourceSuper,
} from "../OBSSource";
import { IPipeWireSource } from "./shared/PipeWire";

export enum WinCaptureMethod {
	Auto,
	DXGI,
	WGC,
}

export type IWinDisplayCaptureSource = ISource & {
	settings: {
		method?: WinCaptureMethod;

		monitor?: number;
		capture_cursor?: boolean;
	};
};

const defaultWinDisplaySource: IWinDisplayCaptureSource = {
	...defaultSource,
	id: "monitor_capture",
};

interface WinDisplayCaptureSource extends Source<IWinDisplayCaptureSource> {}

const WinDisplayCaptureSource = function (
	this: WinDisplayCaptureSource,
	data?: Partial<IWinDisplayCaptureSource>
) {
	const prox = SourceSuper(this, {
		...defaultWinDisplaySource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IWinDisplayCaptureSource,
	WinDisplayCaptureSource
>;

WinDisplayCaptureSource.prototype = Object.create(Source.prototype);

export enum CropMode {
	None,
	Manual,
	ToWindow,
	ToWindowAndManual,
}

export type IMacDisplayCaptureSource = ISource & {
	settings: {
		display?: number;
		show_cursor?: boolean;

		crop_mode?: CropMode;
		window?: number;
		show_empty_names?: boolean;

		"manual.origin.x"?: number;
		"manual.origin.y"?: number;
		"manual.size.width"?: number;
		"manual.size.height"?: number;

		"window.origin.x"?: number;
		"window.origin.y"?: number;
		"window.size.width"?: number;
		"window.size.height"?: number;
	};
};

const defaultMacDisplaySource: IMacDisplayCaptureSource = {
	...defaultSource,
	id: "display_capture",
};

interface MacDisplayCaptureSource extends Source<IMacDisplayCaptureSource> {}

const MacDisplayCaptureSource = function (
	this: MacDisplayCaptureSource,
	data?: Partial<IMacDisplayCaptureSource>
) {
	const prox = SourceSuper(this, {
		...defaultMacDisplaySource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IMacDisplayCaptureSource,
	MacDisplayCaptureSource
>;

MacDisplayCaptureSource.prototype = Object.create(Source.prototype);

const defaultPipeWireDisplaySource: IPipeWireSource = {
	...defaultSource,
	id: "pipewire-desktop-capture-source",
};

interface PipeWireDisplayCaptureSource extends Source<IPipeWireSource> {}

const PipeWireDisplayCaptureSource = function (
	this: PipeWireDisplayCaptureSource,
	data?: Partial<IPipeWireSource>
) {
	const prox = SourceSuper(this, {
		...defaultPipeWireDisplaySource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IPipeWireSource,
	PipeWireDisplayCaptureSource
>;

PipeWireDisplayCaptureSource.prototype = Object.create(Source.prototype);

export type IXSHMDisplayCaptureSource = ISource & {
	settings: {
		screen?: number;

		show_cursor?: boolean;
		advanced?: boolean;

		cut_top?: number;
		cut_left?: number;
		cut_right?: number;
		cut_bot?: number;

		server?: string;
	};
};

const defaultXSHMDisplaySource: IXSHMDisplayCaptureSource = {
	...defaultSource,
	id: "xshm_input",
};

interface XSHMDisplayCaptureSource extends Source<IXSHMDisplayCaptureSource> {}

const XSHMDisplayCaptureSource = function (
	this: XSHMDisplayCaptureSource,
	data?: Partial<IXSHMDisplayCaptureSource>
) {
	const prox = SourceSuper(this, {
		...defaultXSHMDisplaySource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IXSHMDisplayCaptureSource,
	XSHMDisplayCaptureSource
>;

XSHMDisplayCaptureSource.prototype = Object.create(Source.prototype);

export {
	WinDisplayCaptureSource,
	WinDisplayCaptureSource as DisplayCaptureSource,
	MacDisplayCaptureSource,
	PipeWireDisplayCaptureSource,
	XSHMDisplayCaptureSource,
};
