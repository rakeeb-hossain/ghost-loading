import {createSingletonState} from "./utils/singleton";

export const SHIMMER_REFRESH_RATE = 3.0;
export const [use, get, set] = createSingletonState<boolean>(false);

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