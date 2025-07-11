import { ISource } from "../../OBSSource";

export type IPipeWireSource = ISource & {
	settings: {
		ShowCursor?: boolean;
	};
};
