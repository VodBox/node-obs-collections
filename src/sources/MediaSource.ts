import {
	defaultAudioSource,
	IAudioSource,
	PartialSourceConstructor,
	AudioSource,
	AudioSourceSuper,
} from "../OBSSource";

export enum ColorRange {
	Default,
	Partial,
	Full,
}

export type IMediaSource = IAudioSource & {
	settings: {
		is_local_file?: boolean;
		local_file?: string;

		input?: string;
		input_format?: string;

		looping?: boolean;

		restart_on_activate?: boolean;
		clear_on_media_end?: boolean;
		close_when_inactive?: boolean;

		buffering_mb?: number;

		reconnect_delay_sec?: number;

		hw_decode?: boolean;

		speed_percent?: number;

		color_range?: ColorRange;

		linear_alpha?: boolean;
		seekable?: boolean;
	};
};

const defaultMediaSource: IMediaSource = {
	...defaultAudioSource,
	id: "ffmpeg_source",
};

interface MediaSource extends AudioSource<IMediaSource> {
	setLocalFile(path: string): void;
	setURL(url: string): void;
}

const MediaSource = function (this: MediaSource, data?: Partial<IMediaSource>) {
	const prox = AudioSourceSuper(this, {
		...defaultMediaSource,
		...data,
	});

	this.setLocalFile = (path) => {
		prox.settings.local_file = path;
		prox.settings.is_local_file = true;
	};

	this.setURL = (url) => {
		prox.settings.input = url;
		prox.settings.is_local_file = false;
	};

	return prox;
} as unknown as PartialSourceConstructor<IMediaSource, MediaSource>;

MediaSource.prototype = Object.create(AudioSource.prototype);

export { MediaSource };
