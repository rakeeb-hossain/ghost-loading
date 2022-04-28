import {createSingletonState} from "./utils/singleton";

export type AnimateState = "playing" | "paused" | null;

export const SHIMMER_ANIMATION_DUR = 1500;
export const SHIMMER_PAUSE_DUR = 500;
export const [useAnimate, getAnimate, setAnimate] = createSingletonState<AnimateState>(null);
export const DEFAULT_BG_COLOR = "#cfcfcf";
export const DEFAULT_SHIMMER_COLOR = "#e6e6e6";

// Leader management
export var leader: number | null = null;
export const setLeader = (arg: number | null) => {
    console.log(`set leader to ${arg}`)
    leader = arg;
}

/*
Approach 1 (leader election):
- shared state for leader (id) and boolean signalling when to start animation
- if leader is not set, components will compete to set themselves to leader by setting shared state to a count or hash
- once set, if they are the leader, set interval which updates animation state every REFRESH_RATE seconds
- each Ghost has effect which on change of boolean (except on mount), plays animation

complication:
- race condition for leader being set. This is fine! The react scheduler renders full components at once :D

Approach 2 (global synchronization):
- shared state for
 */