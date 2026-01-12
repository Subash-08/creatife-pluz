
import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact Us - Start Your Project',
    description: "Get in touch with Creative Pluz. Let's discuss your project goals and how we can help you achieve them."
};

export default function ContactPage() {
    return <ContactClient />;
}