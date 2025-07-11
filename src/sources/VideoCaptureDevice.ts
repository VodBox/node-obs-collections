import {
	defaultAudioSource,
	IAudioSource,
	PartialSourceConstructor,
	AudioSource,
	AudioSourceSuper,
} from "../OBSSource";

export enum DShowResType {
	Preferred,
	Custom,
}

export enum DShowColorSpace {
	Default = "default",
	Rec709 = "709",
	Rec601 = "601",
}

export enum DShowColorRange {
	Default = "default",
	Partial = "partial",
	Full = "full",
}

export enum DShowBuffering {
	Auto,
	On,
	Off,
}

export type IDShowCaptureSource = IAudioSource & {
	settings: {
		video_device_id?: string;

		use_custom_audio_device?: boolean;
		audio_device_id?: string;

		video_format?: number;
		res_type?: DShowResType;
		resolution?: string;

		flip_vertically?: boolean;

		frame_interval?: number;

		buffering?: DShowBuffering;

		color_space?: DShowColorSpace;
		color_range?: DShowColorRange;

		deactivate_when_not_showing?: boolean;
		autorotation?: boolean;
	};
};

const defaultDShowSource: IDShowCaptureSource = {
	...defaultAudioSource,

	id: "dshow_input",
};

interface DShowCaptureSource extends AudioSource<IDShowCaptureSource> {}

const DShowCaptureSource = function (
	this: DShowCaptureSource,
	data?: Partial<IDShowCaptureSource>
) {
	const prox = AudioSourceSuper(this, {
		...defaultDShowSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IDShowCaptureSource,
	DShowCaptureSource
>;

DShowCaptureSource.prototype = Object.create(AudioSource.prototype);

export enum AVColorSpace {
	Default,
	Rec601,
	Rec709,
}

export enum AVColorRange {
	Auto = -1,
	Partial = 1,
	Full,
}

export type IAVCaptureSource = IAudioSource & {
	settings: {
		device?: string;

		use_preset?: boolean;
		preset?: string;

		buffering?: boolean;

		resolution?: string;
		frame_rate?: {
			numerator: number;
			denominator: number;
		};

		input_format?: number;

		color_space?: AVColorSpace;
		video_range?: AVColorRange;
	};
};

const defaultAVSource: IAVCaptureSource = {
	...defaultAudioSource,

	id: "av_capture_input",
};

interface AVCaptureSource extends AudioSource<IAVCaptureSource> {}

const AVCaptureSource = function (
	this: AVCaptureSource,
	data?: Partial<IAVCaptureSource>
) {
	const prox = AudioSourceSuper(this, {
		...defaultAVSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<IAVCaptureSource, AVCaptureSource>;

AVCaptureSource.prototype = Object.create(AudioSource.prototype);

export enum V4L2ColorRange {
	Default,
	Partial,
	Full,
}

export type IV4L2CaptureSource = IAudioSource & {
	settings: {
		device_id?: string;
		input?: number;
		pixelformat?: number;
		standard?: number;

		dv_timing?: number;
		resolution?: number;
		framerate?: number;

		color_range?: V4L2ColorRange;

		buffering?: boolean;
		auto_reset?: boolean;

		timeout_frames?: number;
	};
};

const defaultV4L2Source: IV4L2CaptureSource = {
	...defaultAudioSource,

	id: "v4l2_input",
};

interface V4L2CaptureSource extends AudioSource<IV4L2CaptureSource> {}

const V4L2CaptureSource = function (
	this: V4L2CaptureSource,
	data?: Partial<IV4L2CaptureSource>
) {
	const prox = AudioSourceSuper(this, {
		...defaultV4L2Source,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<IV4L2CaptureSource, V4L2CaptureSource>;

V4L2CaptureSource.prototype = Object.create(AudioSource.prototype);

export {
	DShowCaptureSource,
	DShowCaptureSource as VideoCaptureSource,
	AVCaptureSource,
	V4L2CaptureSource,
};
