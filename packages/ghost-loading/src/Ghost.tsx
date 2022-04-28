import React, {useEffect, FunctionComponent, useRef} from "react";
import {v4 as uuid} from "uuid";

import * as G from "./GhostUtils";
import {GhostAnimation} from "./GhostAnimation";
import {setNeedLeader} from "./GhostUtils";

export interface GhostProps {
    style?: React.CSSProperties,
    shimmerColor?: string,
    id?: string
}

export const Ghost = ({style, shimmerColor=G.DEFAULT_SHIMMER_COLOR, id=uuid()}: GhostProps) => {
    const idRef = useRef(id);
    const animateState = G.useAnimate();
    const needLeader = G.useNeedLeader();

    const animate = () => {
        G.setAnimate("playing");
        setTimeout(() => {
            G.setAnimate("paused");
        }, G.SHIMMER_ANIMATION_DUR);
    }

    useEffect(() => {
        // Try to claim leader position, but only if leader is not set and not currently animating
        if (G.leader !== null) return;
        G.setLeader(idRef.current);

        // Set animation interval
        const interval = setInterval(animate, G.SHIMMER_ANIMATION_DUR + G.SHIMMER_PAUSE_DUR);

        return () => {
            clearInterval(interval);

            // Relinquish leader position
            G.setLeader(null);
        }
    }, [needLeader]);

    const onComplete = () => {
        // If leader is not set, do pause animation and get new leader
        if (G.leader === null) {
            setTimeout(() => setNeedLeader(!needLeader), G.SHIMMER_PAUSE_DUR);
        }
    }

    return <GhostAnimation style={{ backgroundColor: G.DEFAULT_BG_COLOR, ...style }}
                           shimmerColor={shimmerColor}
                           shouldAnimate={animateState === "playing"}
                           onComplete={onComplete}/>
}