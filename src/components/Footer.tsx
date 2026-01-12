import React from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Info */}
                    <div>
                        <h3 className="font-display font-bold text-2xl text-white mb-4">Creative<span className="text-brand-primary">Pluz</span></h3>
                        <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                            Full-spectrum creative agency engineering growth through trend-driven design and physical brand presence.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-brand-primary transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-brand-primary transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-brand-primary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-brand-primary transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 uppercase tracking-widest text-xs">Navigation</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/portfolio" className="hover:text-brand-primary transition-colors">Selected Work</Link></li>
                            <li><Link href="/about" className="hover:text-brand-primary transition-colors">The Team</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-primary transition-colors">Contact</Link></li>
                            <li><Link href="/services" className="hover:text-brand-primary transition-colors">Services</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 uppercase tracking-widest text-xs">Our Expertise</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/package-design" className="hover:text-brand-primary transition-colors">Package Designing</Link></li>
                            <li><Link href="/social-media" className="hover:text-brand-primary transition-colors">Social Media Posts</Link></li>
                            <li><Link href="/flex-banner" className="hover:text-brand-primary transition-colors">Flex Banner Designs</Link></li>
                            <li><Link href="/branding" className="hover:text-brand-primary transition-colors">Logo & Branding</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 uppercase tracking-widest text-xs">Connect</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-brand-primary mt-0.5 flex-shrink-0" />
                                <span>#7/2, 1st Floor, S.S. Plaza, Advaitha Ashram Rd, Nr. Nathan Hospital, SALEM - 636016.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-brand-primary flex-shrink-0" />
                                <span>creativepluzsalem@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-brand-primary flex-shrink-0" />
                                <span>+91 93630 24021, 93630 27021</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500 uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} Creative Pluz. Salem Branch.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;