"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export function Pointer({ children, className }) {
    const ref = useRef(null);
    const [isInside, setIsInside] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                x.set(e.clientX - rect.left);
                y.set(e.clientY - rect.top);
            }
        };

        const handleMouseEnter = () => setIsInside(true);
        const handleMouseLeave = () => setIsInside(false);

        const element = ref.current;
        if (element) {
            element.addEventListener("mousemove", handleMouseMove);
            element.addEventListener("mouseenter", handleMouseEnter);
            element.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (element) {
                element.removeEventListener("mousemove", handleMouseMove);
                element.removeEventListener("mouseenter", handleMouseEnter);
                element.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [x, y]);

    return (
        <div ref={ref} className="relative">
            {isInside && (
                <motion.div
                    className="pointer-events-none absolute z-50"
                    style={{
                        left: springX,
                        top: springY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                >
                    {children || (
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={cn("fill-black dark:fill-white", className)}
                        >
                            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z" />
                        </svg>
                    )}
                </motion.div>
            )}
        </div>
    );
}
