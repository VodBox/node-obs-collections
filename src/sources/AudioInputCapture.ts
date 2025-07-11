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

const defaultWinAudioInputSource: IWinAudioCaptureSource = {
	...defaultAudioSource,
	id: "wasapi_input_capture",
};

type WinAudioInputCaptureSource = AudioSource<IWinAudioCaptureSource>;

const WinAudioInputCaptureSource = function (
	this: WinAudioInputCaptureSource,
	data?: Partial<IWinAudioCaptureSource>,
) {
	const prox = AudioSourceSuper(this, {
		...defaultWinAudioInputSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IWinAudioCaptureSource,
	WinAudioInputCaptureSource
>;

WinAudioInputCaptureSource.prototype = Object.create(AudioSource.prototype);

const defaultMacAudioInputSource: IMacAudioCaptureSource = {
	...defaultAudioSource,
	id: "coreaudio_input_capture",
};

type MacAudioInputCaptureSource = AudioSource<IMacAudioCaptureSource>;

const MacAudioInputCaptureSource = function (
	this: MacAudioInputCaptureSource,
	data?: Partial<IMacAudioCaptureSource>,
) {
	const prox = AudioSourceSuper(this, {
		...defaultMacAudioInputSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IMacAudioCaptureSource,
	MacAudioInputCaptureSource
>;

MacAudioInputCaptureSource.prototype = Object.create(AudioSource.prototype);

const defaultPulseAudioInputSource: IPulseAudioCaptureSource = {
	...defaultAudioSource,
	id: "pulse_input_capture",
};

type PulseAudioInputCaptureSource = AudioSource<IPulseAudioCaptureSource>;

const PulseAudioInputCaptureSource = function (
	this: PulseAudioInputCaptureSource,
	data?: Partial<IPulseAudioCaptureSource>,
) {
	const prox = AudioSourceSuper(this, {
		...defaultPulseAudioInputSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IPulseAudioCaptureSource,
	PulseAudioInputCaptureSource
>;

PulseAudioInputCaptureSource.prototype = Object.create(AudioSource.prototype);

export enum SampleRate {
	Hz32000 = 32000,
	Hz44100 = 44100,
	Hz48000 = 48000,
}

export type IALSAAudioInputCaptureSource = IAudioSource & {
	settings: {
		device_id?: string;
		custom_pcm?: string;
		rate?: SampleRate;
	};
};

const defaultALSAInputSource: IALSAAudioInputCaptureSource = {
	...defaultAudioSource,
	id: "alsa_input_capture",
};

type ALSAAudioInputCaptureSource = AudioSource<IALSAAudioInputCaptureSource>;

const ALSAAudioInputCaptureSource = function (
	this: ALSAAudioInputCaptureSource,
	data?: Partial<IALSAAudioInputCaptureSource>,
) {
	const prox = AudioSourceSuper(this, {
		...defaultALSAInputSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IALSAAudioInputCaptureSource,
	ALSAAudioInputCaptureSource
>;

ALSAAudioInputCaptureSource.prototype = Object.create(AudioSource.prototype);

export {
	WinAudioInputCaptureSource,
	WinAudioInputCaptureSource as AudioInputCaptureSource,
	MacAudioInputCaptureSource,
	PulseAudioInputCaptureSource,
	ALSAAudioInputCaptureSource,
};
