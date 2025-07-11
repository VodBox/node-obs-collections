import {
	defaultAudioSource,
	PartialSourceConstructor,
	IAudioSource,
	AudioSource,
	AudioSourceSuper,
} from "../OBSSource";
import { IMacAudioCaptureSource } from "./shared/CoreAudio";
import { IPulseAudioCaptureSource } from "./shared/PulseAudio";
import { IWinAudioCaptureSource } from "./shared/WASAPI";

const defaultWinAudioOutputSource: IWinAudioCaptureSource = {
	...defaultAudioSource,
	id: "wasapi_output_capture",
};

type WinAudioOutputCaptureSource = AudioSource<IWinAudioCaptureSource>;

const WinAudioOutputCaptureSource = function (
	this: WinAudioOutputCaptureSource,
	data?: Partial<IWinAudioCaptureSource>,
) {
	const prox = AudioSourceSuper(this, {
		...defaultWinAudioOutputSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IWinAudioCaptureSource,
	WinAudioOutputCaptureSource
>;

WinAudioOutputCaptureSource.prototype = Object.create(AudioSource.prototype);

const defaultMacAudioOutputSource: IMacAudioCaptureSource = {
	...defaultAudioSource,
	id: "coreaudio_output_capture",
};

type MacAudioOutputCaptureSource = AudioSource<IMacAudioCaptureSource>;

const MacAudioOutputCaptureSource = function (
	this: MacAudioOutputCaptureSource,
	data?: Partial<IMacAudioCaptureSource>,
) {
	const prox = AudioSourceSuper(this, {
		...defaultMacAudioOutputSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IMacAudioCaptureSource,
	MacAudioOutputCaptureSource
>;

MacAudioOutputCaptureSource.prototype = Object.create(AudioSource.prototype);

const defaultPulseAudioOutputSource: IPulseAudioCaptureSource = {
	...defaultAudioSource,
	id: "pulse_output_capture",
};

type PulseAudioOutputCaptureSource = AudioSource<IPulseAudioCaptureSource>;

const PulseAudioOutputCaptureSource = function (
	this: PulseAudioOutputCaptureSource,
	data?: Partial<IPulseAudioCaptureSource>,
) {
	const prox = AudioSourceSuper(this, {
		...defaultPulseAudioOutputSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IPulseAudioCaptureSource,
	PulseAudioOutputCaptureSource
>;

PulseAudioOutputCaptureSource.prototype = Object.create(AudioSource.prototype);

export type IJACKAudioOutputCaptureSource = IAudioSource & {
	settings: {
		channels?: number;
	};
};

const defaultJACKAudioOutputSource: IJACKAudioOutputCaptureSource = {
	...defaultAudioSource,
	id: "Jack_output_capture",
};

type JACKAudioOutputCaptureSource = AudioSource<IJACKAudioOutputCaptureSource>;

const JACKAudioOutputCaptureSource = function (
	this: JACKAudioOutputCaptureSource,
	data?: Partial<IJACKAudioOutputCaptureSource>,
) {
	const prox = AudioSourceSuper(this, {
		...defaultJACKAudioOutputSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IJACKAudioOutputCaptureSource,
	JACKAudioOutputCaptureSource
>;

JACKAudioOutputCaptureSource.prototype = Object.create(AudioSource.prototype);

export {
	WinAudioOutputCaptureSource,
	WinAudioOutputCaptureSource as AudioOutputCaptureSource,
	MacAudioOutputCaptureSource,
	PulseAudioOutputCaptureSource,
	JACKAudioOutputCaptureSource,
};
