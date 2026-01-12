import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

export interface ScrollStackItemProps {
    itemClassName?: string;
    children: React.ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => {
    return (
        <div className={`relative w-full h-[550px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl origin-top ${itemClassName}`}>
            {children}
        </div>
    );
};

interface ScrollStackProps {
    children: React.ReactNode;
    itemStackDistance?: number;
    stackPosition?: string;
    itemDistance?: number;
    useWindowScroll?: boolean;
}

interface CardWrapperProps {
    children: React.ReactNode;
    i: number;
    len: number;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
    itemStackDistance: number;
    stackPosition: string;
}

// Internal Card Wrapper handles the Sticky behavior and Scaling
const CardWrapper: React.FC<CardWrapperProps> = ({
    children,
    i,
    len,
    progress,
    range,
    targetScale,
    itemStackDistance,
    stackPosition
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scale the card based on the total scroll progress of the parent container
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={containerRef}
            className="h-screen flex items-start justify-center sticky top-0"
            style={{
                top: 0,
                // Dynamically check if it's the last item to remove negative margin
                marginBottom: i === len - 1 ? 0 : '-20vh'
            }}
        >
            <motion.div
                style={{
                    scale,
                    // The visual top offset for the "Stack" look
                    top: `calc(${stackPosition} + ${i * itemStackDistance}px)`,
                }}
                className="relative w-full max-w-6xl origin-top"
            >
                {children}
            </motion.div>
        </div>
    )
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    itemStackDistance = 40,
    stackPosition = "15%"
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of the entire stack container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const items = React.Children.toArray(children);
    const len = items.length;

    return (
        // Dynamic height based on number of items to ensure smooth scrolling
        <div ref={containerRef} className="relative" style={{ height: `${len * 50 + 50}vh` }}>
            {items.map((child, i) => {
                // Calculate target scale: earlier items shrink more
                const targetScale = 1 - ((len - 1 - i) * 0.05);

                return (
                    <CardWrapper
                        key={i}
                        i={i}
                        len={len}
                        progress={scrollYProgress}
                        range={[0, 1]}
                        targetScale={targetScale}
                        itemStackDistance={itemStackDistance}
                        stackPosition={stackPosition}
                    >
                        {child}
                    </CardWrapper>
                );
            })}
        </div>
    );
};

export default ScrollStack;