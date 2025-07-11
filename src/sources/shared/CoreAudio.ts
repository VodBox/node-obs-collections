import { IAudioSource } from "../../OBSSource";

export type IMacAudioCaptureSource = IAudioSource & {
	settings: {
		device_id?: string;
	};
};
