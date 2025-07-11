import {
	defaultAudioSource,
	IAudioSource,
	PartialSourceConstructor,
	AudioSource,
	AudioSourceSuper,
} from "../OBSSource";

export type IAJADeviceCaptureSource = IAudioSource & {
	settings: {
		ui_prop_device?: string;
		ui_prop_input?: number;

		ui_prop_vid_fmt?: number;
		ui_prop_pix_fmt?: number;

		ui_prop_sdi_transport?: number;
		ui_prop_sdi_transport_4k?: number;

		ui_prop_deactivate_when_not_showing?: boolean;
	};
};

const defaultAJADeviceSource: IAJADeviceCaptureSource = {
	...defaultAudioSource,
	id: "aja_source",
};

type AJADeviceCaptureSource = AudioSource<IAJADeviceCaptureSource>;

const AJADeviceCaptureSource = function (
	this: AJADeviceCaptureSource,
	data?: Partial<IAJADeviceCaptureSource>,
) {
	const prox = AudioSourceSuper(this, {
		...defaultAJADeviceSource,
		...data,
	});

	return prox;
} as unknown as PartialSourceConstructor<
	IAJADeviceCaptureSource,
	AJADeviceCaptureSource
>;

AJADeviceCaptureSource.prototype = Object.create(AudioSource.prototype);

export { AJADeviceCaptureSource };
