import { BrowserSource } from "./Browser";
import { ColorSource } from "./ColorSource";
import {
	MacDisplayCaptureSource,
	PipeWireDisplayCaptureSource,
	WinDisplayCaptureSource,
	XSHMDisplayCaptureSource,
} from "./DisplayCapture";
import { GameCaptureSource } from "./GameCapture";
import { ImageSource } from "./ImageSource";
import { MediaSource } from "./MediaSource";
import { SlideshowSource } from "./ImageSlideShow";
import { TextGDISource, TextFT2Source } from "./Text";
import {
	AVCaptureSource,
	DShowCaptureSource,
	V4L2CaptureSource,
} from "./VideoCaptureDevice";
import { VLCSource } from "./VLCVideoSource";
import {
	WinWindowCaptureSource,
	XCompWindowCaptureSource,
} from "./WIndowCapture";
import {
	ALSAAudioInputCaptureSource,
	MacAudioInputCaptureSource,
	PulseAudioInputCaptureSource,
	WinAudioInputCaptureSource,
} from "./AudioInputCapture";
import {
	JACKAudioOutputCaptureSource,
	MacAudioOutputCaptureSource,
	PulseAudioOutputCaptureSource,
	WinAudioOutputCaptureSource,
} from "./AudioOutputCapture";
import { SyphonClientSource } from "./SyphonClient";
import { AJADeviceCaptureSource } from "./AJADeviceCapture";

export type SourceKey = keyof typeof SourceMap;

export enum Sources {
	ColorSource = "color_source",
	MediaSource = "ffmpeg_source",
	ImageSource = "image_source",
	ImageSlideShow = "slideshow",

	Browser = "browser_source",

	VLCVideoSource = "vlc_source",

	GameCapture = "game_capture",
	SyphonClient = "syphon-input",

	AJADeviceCapture = "aja_source",

	/** Text */

	Text = "text_gdiplus",
	TextGDI = "text_gdiplus",
	TextFT2 = "text_ft2_source",

	/** Video Capture Device */

	VideoCaptureDevice = "dshow_input",

	WinVideoCaptureDevice = "dshow_input",
	DShowCaptureDevice = "dshow_input",

	MacVideoCaptureDevice = "av_capture_input",
	AVCaptureDevice = "av_capture_input",

	NixVideoCaptureDevice = "v4l2_input",
	V4L2CaptureDevice = "v4l2_input",

	/** Display Capture */

	DisplayCapture = "monitor_capture",

	WinDisplayCapture = "monitor_capture",

	MacDisplayCapture = "display_capture",

	NixDisplayCapture = "xshm_input",
	XSHMDisplayCapture = "xshm_input",

	PipeWireDisplayCapture = "pipewire-desktop-capture-source",

	/** Window Capture */

	WindowCapture = "window_capture",

	WinWindowCapture = "window_capture",
	MacWindowCapture = "window_capture",

	NixWindowCapture = "xcomposite_input",
	XCompWindowCapture = "xcomposite_input",

	/** Audio Capture */

	AudioInputCapture = "wasapi_input_capture",
	AudioOutputCapture = "wasapi_output_capture",

	WinAudioInputCapture = "wasapi_input_capture",
	WinAudioOutputCapture = "wasapi_output_capture",
	WASAPIAudioInputCapture = "wasapi_input_capture",
	WASAPIAudioOutputCapture = "wasapi_output_capture",

	MacAudioInputCapture = "coreaudio_input_capture",
	MacAudioOutputCapture = "coreaudio_output_capture",
	CoreAudioInputCapture = "coreaudio_input_capture",
	CoreAudioOutputCapture = "coreaudio_output_capture",

	NixAudioInputCapture = "pulse_input_capture",
	NixAudioOutputCapture = "pulse_output_capture",
	PulseAudioInputCapture = "pulse_input_capture",
	PulseAudioOutputCapture = "pulse_output_capture",

	ALSAAudioInputCapture = "alsa_input_capture",

	JACKAudioOutputCapture = "jack_output_capture",
}

export const SourceMap = {
	color_source: ColorSource,
	ffmpeg_source: MediaSource,
	image_source: ImageSource,
	slideshow: SlideshowSource,

	text_gdiplus: TextGDISource,
	text_ft2_source: TextFT2Source,

	browser_source: BrowserSource,

	dshow_input: DShowCaptureSource,
	av_capture_input: AVCaptureSource,
	v4l2_input: V4L2CaptureSource,

	vlc_source: VLCSource,

	game_capture: GameCaptureSource,
	"syphon-input": SyphonClientSource,

	monitor_capture: WinDisplayCaptureSource,
	display_capture: MacDisplayCaptureSource,
	xshm_input: XSHMDisplayCaptureSource,
	"pipewire-desktop-capture-source": PipeWireDisplayCaptureSource,

	window_capture: WinWindowCaptureSource,
	xcomposite_input: XCompWindowCaptureSource,

	wasapi_input_capture: WinAudioInputCaptureSource,
	wasapi_output_capture: WinAudioOutputCaptureSource,

	coreaudio_input_capture: MacAudioInputCaptureSource,
	coreaudio_output_capture: MacAudioOutputCaptureSource,

	pulse_input_capture: PulseAudioInputCaptureSource,
	pulse_output_capture: PulseAudioOutputCaptureSource,

	alsa_input_capture: ALSAAudioInputCaptureSource,
	jack_output_capture: JACKAudioOutputCaptureSource,

	aja_source: AJADeviceCaptureSource,
};
