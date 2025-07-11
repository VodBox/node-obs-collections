import { ApplyLUTFilter } from "./ApplyLUT";
import { ChromaKeyFilter } from "./ChromaKey";
import { ColorCorrectionFilter } from "./ColorCorrection";
import { ColorKeyFilter } from "./ColorKey";
import { SharpenFilter } from "./Sharpen";

export type FilterKey = keyof typeof FilterMap;

export const FilterMap = {
	sharpness_filter: SharpenFilter,
	color_filter: ColorCorrectionFilter,
	color_key_filter: ColorKeyFilter,
	chroma_key_filter: ChromaKeyFilter,
	clut_filter: ApplyLUTFilter,
};
