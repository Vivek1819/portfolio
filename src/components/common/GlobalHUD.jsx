import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const GlobalHUD = () => {
    const { scrollYProgress } = useScroll();
    
    // Scale up the scroll progress to look like a full gauge
    const scaleY = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });

    const [percent, setPercent] = useState(0);

    const gaugeHeight = useTransform(scaleY, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            setPercent(Math.round(latest * 100));
        });
    }, [scrollYProgress]);

    return (
        <>
            {/* Right Side Vertical Progress Gauge (Fuel Bar) */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 h-[40vh] w-[4px] bg-void-line flex flex-col justify-end overflow-hidden z-[49] pointer-events-none rounded-full border border-starlight/5">
                <motion.div 
                    className="w-full bg-gradient-to-t from-neon-purple via-neon-cyan to-supernova shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    style={{ height: gaugeHeight }}
                />
            </div>

            {/* Gauge Labels */}
            <div className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col justify-between h-[40vh] py-2 z-[49] pointer-events-none micro-text text-[8px] text-starlight/30 items-end">
                <span>100% // JMP</span>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-supernova font-bold">{percent}%</span>
                    <span>FLIGHT PATH</span>
                </div>
                <span>000% // VOID</span>
            </div>
        </>
    );
};

export default GlobalHUD;
