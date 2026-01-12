import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface InteractiveBoxProps {
    frontImage?: string;
    sideImage?: string;
    topImage?: string;
    title: string;
}

const InteractiveBox: React.FC<InteractiveBoxProps> = ({
    frontImage = "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=800&auto=format&fit=crop",
    sideImage = "https://images.unsplash.com/photo-1586075010633-de44f508c39b?q=80&w=800&auto=format&fit=crop",
    topImage = "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    title
}) => {
    const [isHovered, setIsHovered] = useState(false);

    // Motion values for rotation
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for fluid motion
    const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <div
            className="relative w-full h-[500px] flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1200px" }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-64 h-80"
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 bg-white border border-black/5 shadow-2xl overflow-hidden"
                    style={{ transform: "translateZ(100px)" }}
                >
                    <img src={frontImage} className="w-full h-full object-cover opacity-90" alt="Front" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <h4 className="text-black font-display font-black text-xl uppercase leading-none">{title}</h4>
                        <p className="text-black/60 text-[8px] font-bold uppercase tracking-widest mt-2">Premium Edition</p>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 bg-brand-gray border border-white/10"
                    style={{ transform: "rotateY(180deg) translateZ(100px)" }}
                />

                {/* Right Face */}
                <div
                    className="absolute inset-y-0 w-[200px] bg-white/90 border border-black/5"
                    style={{
                        left: "50%",
                        marginLeft: "-100px",
                        transform: "rotateY(90deg) translateZ(128px)"
                    }}
                >
                    <img src={sideImage} className="w-full h-full object-cover grayscale opacity-50" alt="Side" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-black/20 font-display font-black text-4xl -rotate-90 uppercase">Details</span>
                    </div>
                </div>

                {/* Left Face */}
                <div
                    className="absolute inset-y-0 w-[200px] bg-brand-primary"
                    style={{
                        left: "50%",
                        marginLeft: "-100px",
                        transform: "rotateY(-90deg) translateZ(128px)"
                    }}
                >
                    <div className="p-8 flex flex-col justify-between h-full">
                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-brand-primary font-black text-[10px]">P+</div>
                        <div className="text-black font-bold uppercase text-[10px] tracking-tighter leading-none">
                            Innovation <br /> Excellence <br /> Branding
                        </div>
                    </div>
                </div>

                {/* Top Face */}
                <div
                    className="absolute inset-x-0 h-[200px] bg-slate-100 border border-black/5"
                    style={{
                        top: "50%",
                        marginTop: "-100px",
                        transform: "rotateX(90deg) translateZ(160px)"
                    }}
                >
                    <img src={topImage} className="w-full h-full object-cover opacity-20" alt="Top" />
                </div>

                {/* Bottom Face */}
                <div
                    className="absolute inset-x-0 h-[200px] bg-black"
                    style={{
                        top: "50%",
                        marginTop: "-100px",
                        transform: "rotateX(-90deg) translateZ(160px)"
                    }}
                />

                {/* Shadow Projection */}
                <div
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/40 blur-2xl rounded-full"
                    style={{ transform: "rotateX(90deg) translateZ(-50px)" }}
                />
            </motion.div>

            <div className="absolute bottom-10 text-center pointer-events-none">
                <motion.p
                    animate={{ opacity: isHovered ? 0 : 1 }}
                    className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]"
                >
                    Move mouse to inspect mockup
                </motion.p>
            </div>
        </div>
    );
};

export default InteractiveBox;