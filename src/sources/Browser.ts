import {
	defaultAudioSource,
	IAudioSource,
	PartialSourceConstructor,
	AudioSource,
	AudioSourceSuper,
} from "../OBSSource";

export enum ControlLevel {
	None,
	ReadObs,
	ReadUser,
	Basic,
	Advanced,
	All,
}

export type IBrowserSource = IAudioSource & {
	settings: {
		is_local_file?: boolean;
		local_file?: string;

		url?: string;

		width?: number;
		height?: number;

		fps_custom?: boolean;
		fps?: number;

		reroute_audio?: boolean;

		css?: string;

		shutdown?: boolean;
		restart_when_active?: boolean;

		webpage_control_level?: ControlLevel;
	};
};

const defaultBrowserSource: IBrowserSource = {
	...defaultAudioSource,
	id: "browser_source",
};

interface BrowserSource extends AudioSource<IBrowserSource> {
	setLocalFile(path: string): void;
	setURL(url: string): void;
}

const BrowserSource = function (
	this: BrowserSource,
	data?: Partial<IBrowserSource>
) {
	const prox = AudioSourceSuper(this, {
		...defaultBrowserSource,
		...data,
	});

	this.setLocalFile = (path) => {
		prox.settings.local_file = path;
		prox.settings.is_local_file = true;
	};

	this.setURL = (url) => {
		prox.settings.url = url;
		prox.settings.is_local_file = false;
	};

	return prox;
} as unknown as PartialSourceConstructor<IBrowserSource, BrowserSource>;

BrowserSource.prototype = Object.create(AudioSource.prototype);

export { BrowserSource };
