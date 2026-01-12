'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import logoImage from '/public/assets/images/service/creative_logo.png';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showServices, setShowServices] = useState(false);

    const navLinks = [
        { name: 'Work', path: '/portfolio' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const serviceLinks = [
        { name: 'Logo & Branding', path: '/services/branding' },
        { name: 'Product Package Designing', path: '/services/package-design' },
        { name: 'Social Media Post', path: '/services/social-media' },
        { name: 'Flex Banner Designs', path: '/services/flex-banner' },
        { name: 'Brochure & Print Advertising', path: '/services/brochure-media' },
        { name: 'Product Photography', path: '/services/photography' },
        { name: 'Corporate Display', path: '/services/corporate-display' },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-2 md:px-12 md:py-2 text-white">
                <div className="flex justify-between items-center max-w-[1920px] mx-auto">
                    {/* Logo */}
                    <Link href="/" className="group relative z-50 flex items-center">
                        {/* Set parent div to exactly 100px (w-25/h-25 in Tailwind is 100px, or use arbitrary values) */}
                        <div className="relative w-[150px] h-[80px]">
                            <Image
                                src={logoImage}
                                alt="CreativePluz Logo"
                                fill
                                /* object-contain ensures the logo isn't distorted within the 100x100 box */
                                className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-10">
                        {/* Services Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setShowServices(true)}
                            onMouseLeave={() => setShowServices(false)}
                        >
                            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-brand-primary transition-colors py-2 outline-none">
                                Services <ChevronDown className={`w-4 h-4 transition-transform ${showServices ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showServices && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 w-72 bg-brand-dark border border-white/10 p-4 mt-2 shadow-2xl"
                                    >
                                        {serviceLinks.map((service) => (
                                            <Link
                                                key={service.name}
                                                href={service.path}
                                                className="block py-3 px-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-black transition-all"
                                            >
                                                {service.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className="text-sm font-bold uppercase tracking-widest hover:text-brand-primary transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center z-50">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white focus:outline-none p-2 -mr-2 hover:text-brand-primary transition-colors"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-brand-dark flex flex-col"
                    >
                        {/* 1. Header Area inside Menu */}
                        <div className="flex justify-between items-center px-6 py-8 border-b border-white/5">
                            <span className="text-white font-mono text-[10px] tracking-[0.4em] uppercase">Creative<span className="text-brand-primary">Pluz</span></span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-brand-primary transition-colors text-[10px] font-black uppercase tracking-widest"
                            >
                                [ Close ]
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

                            {/* 2. Primary Navigation (The Big Hits) */}
                            <div className="flex-[2] flex flex-col justify-center px-6 md:px-20 border-b lg:border-b-0 lg:border-r border-white/5">
                                <nav className="space-y-4 md:space-y-8">
                                    {navLinks.map((link, i) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <Link
                                                href={link.path}
                                                onClick={() => setIsOpen(false)}
                                                className="group inline-flex items-baseline gap-4"
                                            >
                                                <span className="text-brand-primary font-mono text-xs md:text-sm">0{i + 1}</span>
                                                <span className="text-4xl md:text-8xl font-display font-black text-white group-hover:text-brand-primary transition-all uppercase tracking-tighter group-hover:italic">
                                                    {link.name}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>
                            </div>

                            {/* 3. Secondary Section (Services & Socials) */}
                            <div className="flex-1 bg-white/[0.02] p-6 md:p-12 flex flex-col justify-between">

                                {/* Services Grid */}
                                <div>
                                    <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] mb-8">Expertise</p>
                                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                        {serviceLinks.map((service, i) => (
                                            <Link
                                                key={service.name}
                                                href={service.path}
                                                onClick={() => setIsOpen(false)}
                                                className="text-[10px] md:text-xs font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest"
                                            >
                                                {service.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Socials & Contact Info */}
                                <div className="mt-12 lg:mt-0 pt-8 border-t border-white/5 flex flex-col gap-6">
                                    <div className="flex gap-8">
                                        {['IG', 'LN', 'TW'].map((social) => (
                                            <a key={social} href="#" className="text-xs font-black text-white hover:text-brand-primary transition-colors">{social}</a>
                                        ))}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">Inquiries</p>
                                        <p className="text-sm font-medium text-white">hello@creativepluz.com</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;