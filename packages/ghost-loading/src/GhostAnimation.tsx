import React from "react";
import {AnimateState, SHIMMER_ANIMATION_DUR, SHIMMER_PAUSE_DUR} from "./GhostUtils";
import {motion} from "framer-motion";

interface GhostAnimationProps {
    style: React.CSSProperties,
    shimmerColor: string,
    shouldAnimate: boolean,
    onComplete: () => void
}

const variants = {
    paused: {
        x: "-100%",
        transition: {
            duration: 0
        }
    },
    playing: {
        x: "100%",
        transition: {
            duration: SHIMMER_ANIMATION_DUR/1000,
        }
    }
}

export const GhostAnimation = (props: GhostAnimationProps) => {
    return (
        <div style={{ overflow: "hidden", ...props.style }}>
            <motion.div style={{height: "100%",
                                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0), ${props.shimmerColor}, rgba(0,0,0,0))`}}
                        initial={"paused"}
                        animate={props.shouldAnimate ? "playing" : "paused"}
                        variants={variants}
                        onAnimationComplete={props.onComplete}
            >
            </motion.div>
        </div>
    )
}