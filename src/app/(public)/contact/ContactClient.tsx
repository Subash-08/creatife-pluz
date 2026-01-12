'use client';

import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/Button';
import { motion } from 'framer-motion';

type FormInputs = {
    name: string;
    email: string;
    phone: string;
    budget: string;
    message: string;
};

const ContactClient: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data);
        alert("Request received. We will be in touch shortly.");
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-brand-dark">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
                                Let's Talk <br /> <span className="text-brand-primary">Business.</span>
                            </h1>
                            <p className="text-xl text-slate-400 mb-12 max-w-md leading-relaxed">
                                Have a project in mind? We'd love to hear about it. Fill out the form and our strategy team will contact you within 24 hours.
                            </p>

                            <div className="space-y-8 mb-12">
                                <div className="flex items-start gap-6">
                                    <Mail className="text-brand-primary w-6 h-6 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
                                        <p className="text-slate-400 text-lg">creativepluzsalem@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <Phone className="text-brand-primary w-6 h-6 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">Call Us</h3>
                                        <p className="text-slate-400 text-lg">+91 93630 24021, 93630 27021</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <MapPin className="text-brand-primary w-6 h-6 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">Visit Us</h3>
                                        <p className="text-slate-400 text-lg">
                                            #7/2, 1st Floor, S.S. Plaza, Advaitha Ashram Rd,<br />
                                            Nr. Nathan Hospital, SALEM - 636016.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-brand-primary/10 border border-brand-primary/20 max-w-md">
                                <h4 className="text-white font-bold mb-2">Looking for a career?</h4>
                                <p className="text-slate-400 text-sm mb-4">We are always looking for top talent to join our team.</p>
                                <span className="text-brand-primary font-bold text-sm uppercase tracking-wide cursor-pointer hover:text-white transition-colors">View Openings &rarr;</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#121418] p-8 md:p-12 border border-white/5"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">Name</label>
                                    <input
                                        {...register("name", { required: true })}
                                        className="w-full bg-transparent border-b border-slate-700 py-3 text-white focus:border-brand-primary outline-none transition-colors placeholder:text-slate-700 text-lg"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <span className="text-red-500 text-xs mt-1">Required</span>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">Email</label>
                                    <input
                                        {...register("email", { required: true })}
                                        className="w-full bg-transparent border-b border-slate-700 py-3 text-white focus:border-brand-primary outline-none transition-colors placeholder:text-slate-700 text-lg"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">Phone</label>
                                    <input
                                        {...register("phone")}
                                        className="w-full bg-transparent border-b border-slate-700 py-3 text-white focus:border-brand-primary outline-none transition-colors placeholder:text-slate-700 text-lg"
                                        placeholder="+91 (000) 000-0000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">Project Budget</label>
                                    <select
                                        {...register("budget", { required: true })}
                                        className="w-full bg-transparent border-b border-slate-700 py-3 text-white focus:border-brand-primary outline-none transition-colors text-lg appearance-none"
                                    >
                                        <option value="" className="bg-brand-dark text-slate-500">Select Range...</option>
                                        <option value="10-25k" className="bg-brand-dark">$10k - $25k</option>
                                        <option value="25-50k" className="bg-brand-dark">$25k - $50k</option>
                                        <option value="50-100k" className="bg-brand-dark">$50k - $100k</option>
                                        <option value="100k+" className="bg-brand-dark">$100k+</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">Project Details</label>
                                <textarea
                                    {...register("message", { required: true })}
                                    rows={4}
                                    className="w-full bg-transparent border-b border-slate-700 py-3 text-white focus:border-brand-primary outline-none transition-colors placeholder:text-slate-700 text-lg resize-none"
                                    placeholder="Tell us about your goals..."
                                ></textarea>
                            </div>

                            <Button type="submit" className="w-full bg-white text-black hover:bg-brand-primary hover:text-white border-none py-5 text-lg font-bold uppercase tracking-wide rounded-none mt-8">
                                Submit Request <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactClient;
