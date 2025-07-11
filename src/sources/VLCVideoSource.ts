import {
	defaultAudioSource,
	IAudioSource,
	PartialSourceConstructor,
	AudioSource,
	AudioSourceSuper,
} from "../OBSSource";

export enum VLCBehavior {
	StopRestart = "stop_restart",
	PauseUnpause = "pause_unpause",
	AlwaysPlay = "always_play",
}

export type IVLCSource = IAudioSource & {
	settings: {
		playlist?: string[];

		loop?: boolean;
		shuffle?: boolean;

		playback_behavior?: VLCBehavior;

		network_caching?: number;
		track?: number;

		subtitle_enable?: boolean;
		subtitle?: number;
	};
};

const defaultVLCSource: IVLCSource = {
	...defaultAudioSource,

	id: "vlc_source",
};

type VLCSource = AudioSource<IVLCSource>;

const VLCSource = function (this: VLCSource, data?: Partial<IVLCSource>) {
	const prox = AudioSourceSuper(this, {
		...defaultVLCSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<IVLCSource, VLCSource>;

VLCSource.prototype = Object.create(AudioSource.prototype);

export { VLCSource };
