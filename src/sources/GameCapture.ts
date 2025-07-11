import {
	defaultSource,
	ISource,
	PartialSourceConstructor,
	Source,
	SourceSuper,
} from "../OBSSource";

export enum CaptureMode {
	Any = "any_fullscreen",
	Window = "window",
	Hotkey = "hotkey",
}

export enum HookRate {
	Slow,
	Normal,
	Fast,
	Fastest,
}

export enum WindowPriority {
	Title,
	Class,
	Exe,
}

export type IGameCaptureSource = ISource & {
	settings: {
		capture_mode?: CaptureMode;
		window?: string;
		priority?: WindowPriority;

		capture_cursor?: boolean;
		allow_transparency?: boolean;
		limit_framerate?: boolean;
		capture_overlays?: boolean;
		anti_cheak_hook?: boolean;
		sli_compatibility?: boolean;

		hook_rate?: HookRate;
	};
};

const defaultGameSource: IGameCaptureSource = {
	...defaultSource,

	id: "game_capture",
};

type GameCaptureSource = Source<IGameCaptureSource>;

const GameCaptureSource = function (
	this: GameCaptureSource,
	data?: Partial<IGameCaptureSource>,
) {
	const prox = SourceSuper(this, {
		...defaultGameSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<IGameCaptureSource, GameCaptureSource>;

GameCaptureSource.prototype = Object.create(Source.prototype);

export { GameCaptureSource };
