import { PartialTransitionConstructor } from "../OBSTransition";

export const KnownTransitionKeys = {};

export type TransitionKey = keyof typeof KnownTransitionKeys;

export const TransitionMap: Record<
	TransitionKey,
	PartialTransitionConstructor
> = {};
