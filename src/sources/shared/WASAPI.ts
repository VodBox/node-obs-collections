import { IAudioSource } from "../../OBSSource";

export type IWinAudioCaptureSource = IAudioSource & {
	settings: {
		device_id?: string;
		use_device_timing?: boolean;
	};
};
