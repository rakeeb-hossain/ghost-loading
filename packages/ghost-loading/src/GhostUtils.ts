import {createSingletonState} from "./utils/singleton";

export type AnimateState = "playing" | "paused" | null;

export const SHIMMER_ANIMATION_DUR = 500;
export const SHIMMER_PAUSE_DUR = 50;
export const TOTAL_DUR = SHIMMER_ANIMATION_DUR + SHIMMER_PAUSE_DUR;
export const [useAnimate, getAnimate, setAnimate] = createSingletonState<AnimateState>(null);
export const [useNeedLeader, getNeedLeader, setNeedLeader] = createSingletonState<boolean>(true);
export const DEFAULT_BG_COLOR = "#cfcfcf";
export const DEFAULT_SHIMMER_COLOR = "#e6e6e6";

// Leader management
export var leader: string | null = null;
export const setLeader = (arg: string | null) => {
    leader = arg;
}