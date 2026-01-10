'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { Palette, Box, Type, FileStack, MousePointer2 } from 'lucide-react';
import InteractiveBox from '@/components/InteractiveBox.client';

const HorizontalScrollSection = () => {
    const horizontalRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: horizontalRef,
        offset: ["start start", "end end"]
    });

    const scrollVelocity = useVelocity(scrollYProgress);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const skewX = useTransform(smoothVelocity, [-0.5, 0.5], ["-5deg", "5deg"]);
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    return (
        <section ref={horizontalRef} className="py-32 bg-slate-50 overflow-hidden">
            <div className="mb-16 px-6">
                <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                    Section 02: What We Offer
                </span>
                <h2 className="text-5xl font-display font-black text-black mb-6">
                    Comprehensive <span className="text-brand-primary">Brand Solutions</span>
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl">
                    From logo design to complete brand systems, we provide everything you need for a cohesive brand identity.
                </p>
            </div>

            <motion.div
                style={{ x, skewX }}
                className="flex gap-8 px-6"
            >
                {[
                    {
                        icon: <Palette className="w-12 h-12" />,
                        title: "Logo Design",
                        description: "Unique, memorable logos that capture your brand essence.",
                        features: ["3 Concepts", "Unlimited Revisions", "Vector Files"]
                    },
                    {
                        icon: <Type className="w-12 h-12" />,
                        title: "Brand Guidelines",
                        description: "Complete manual for consistent brand application.",
                        features: ["Color System", "Typography", "Logo Usage"]
                    },
                    {
                        icon: <Box className="w-12 h-12" />,
                        title: "Packaging Design",
                        description: "Product packaging that sells on the shelf.",
                        features: ["3D Mockups", "Print-Ready Files", "Material Guidance"]
                    },
                    {
                        icon: <FileStack className="w-12 h-12" />,
                        title: "Brand Assets",
                        description: "Complete set of digital and print assets.",
                        features: ["Social Media Kit", "Business Cards", "Letterheads"]
                    },
                    {
                        icon: <MousePointer2 className="w-12 h-12" />,
                        title: "Web Integration",
                        description: "Seamless brand implementation across digital platforms.",
                        features: ["UI Components", "Style Guide", "Implementation Support"]
                    }
                ].map((service, index) => (
                    <InteractiveBox key={index} className="w-[400px] flex-shrink-0">
                        <div className="p-8 h-full">
                            <div className="text-brand-primary mb-6">{service.icon}</div>
                            <h3 className="text-2xl font-bold text-black mb-4">{service.title}</h3>
                            <p className="text-slate-600 mb-8">{service.description}</p>
                            <ul className="space-y-3">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="text-slate-700 flex items-center">
                                        <div className="w-2 h-2 bg-brand-primary rounded-full mr-3"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </InteractiveBox>
                ))}
            </motion.div>
        </section>
    );
};

export default HorizontalScrollSection;
