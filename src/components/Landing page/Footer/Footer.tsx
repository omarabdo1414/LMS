import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[var(--main-hero)] text-white p-6 mt-7">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col md:items-start text-center md:text-left">
                    <h6 className="text-[var(--hover)] text-5xl font-bold">LMS</h6>
                    <p className="mt-4 text-sm text-[oklch(1_0_0.6)]">
                        A leading educational platform offering a unique and innovative learning experience for students in various fields, with rich content and specialized instructors.
                    </p>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-4 text-[var(--hover)]">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/#about" className="hover:text-[var(--accent)] transition-colors">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/#details" className="hover:text-[var(--accent)] transition-colors">
                                Program Details
                            </Link>
                        </li>
                        <li>
                            <Link href="/#benefits" className="hover:text-[var(--accent)] transition-colors">
                                Benefits
                            </Link>
                        </li>
                        <li>
                            <Link href="/#criteria" className="hover:text-[var(--accent)] transition-colors">
                                Selection Criteria
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="text-center md:text-right">
                    <h3 className="text-lg font-semibold mb-4 text-[var(--hover)]">Contact Us</h3>
                    <div className="flex justify-center md:justify-end space-x-4 mb-4">
                        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                            <Facebook size={24} />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                            <Twitter size={24} />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                            <Instagram size={24} />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                            <Linkedin size={24} />
                        </a>
                    </div>
                    <p className="text-sm text-[oklch(1_0_0.6)]">©2025 Learning Platform. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
