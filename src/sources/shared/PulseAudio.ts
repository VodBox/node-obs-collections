import { IAudioSource } from "../../OBSSource";

export type IPulseAudioCaptureSource = IAudioSource & {
	settings: {
		device_id?: string;
	};
}