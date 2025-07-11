import {
	defaultSource,
	ISource,
	PartialSourceConstructor,
	Source,
	SourceSuper,
} from "../OBSSource";

export enum SlideshowTransition {
	Cut = "cut",
	Fade = "fade",
	Swipe = "swipe",
	Slide = "slide",
}

export enum SlideshowBehavior {
	StopRestart = "stop_restart",
	PauseUnpause = "pause_unpause",
	AlwaysPlay = "always_play",
}

export enum SlideshowMode {
	Auto = "mode_auto",
	Manual = "mode_manual",
}

export type ISlideshowSource = ISource & {
	settings: {
		transition_speed?: number;
		use_custom_size?: boolean;

		slide_time?: number;
		transition?: SlideshowTransition;

		randomize?: boolean;

		loop?: boolean;
		hide?: boolean;

		files?: string[];

		playback_behavior?: SlideshowBehavior;

		slide_mode?: SlideshowMode;
	};
};

const defaultSlideshowSource: ISlideshowSource = {
	...defaultSource,

	id: "slideshow",
};

interface SlideshowSource extends Source<ISlideshowSource> {}

const SlideshowSource = function (
	this: SlideshowSource,
	data?: Partial<ISlideshowSource>
) {
	const prox = SourceSuper(this, {
		...defaultSlideshowSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<ISlideshowSource, SlideshowSource>;

SlideshowSource.prototype = Object.create(Source.prototype);

export { SlideshowSource };
