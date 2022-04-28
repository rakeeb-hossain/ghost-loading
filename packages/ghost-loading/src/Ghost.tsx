import React, {useEffect, FunctionComponent} from "react";
import * as G from "./GhostUtils";
import {GhostAnimation} from "./GhostAnimation";

export interface GhostProps {
    style?: React.CSSProperties,
    shimmerColor?: string
}

export const Ghost = ({style, shimmerColor=G.DEFAULT_SHIMMER_COLOR}: GhostProps) => {
    const id = Date.now();
    const animateState = G.useAnimate();

    const animate = () => {
        G.setAnimate("playing");
        setTimeout(() => {
            G.setAnimate("paused");
        }, G.SHIMMER_ANIMATION_DUR);
    }

    useEffect(() => {
        // Try to claim leader position, but only if leader is not set and not currently animating
        if (G.leader !== null || animateState !== null) return;
        G.setLeader(id);

        // Set animation interval
        animate();
        const interval = setInterval(animate, G.SHIMMER_ANIMATION_DUR + G.SHIMMER_PAUSE_DUR);

        return () => {
            clearInterval(interval);

            // Relinquish leader position
            G.setLeader(null);
        }
    }, []);

    const onComplete = () => {
        // If leader is not set, set animateState to null since it is done
        if (G.leader === null)
            G.setAnimate(null);
    }

    return <GhostAnimation style={{ backgroundColor: G.DEFAULT_BG_COLOR, ...style }}
                           shimmerColor={shimmerColor}
                           shouldAnimate={animateState === "playing"}
                           onComplete={onComplete}/>
}