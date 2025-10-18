import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="bg-card border-t border-border text-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-4">
            <h4 className='text-accent text-3xl font-semibold'>LMS</h4>
            <p className="text-muted-foreground max-w-xs">
              A brief summary of the educational platform. Our goal is to provide the best learning experience for students and develop their skills for the future.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-muted-foreground hover:text-accent  transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#details" className="text-muted-foreground hover:text-accent  transition-colors">
                  Program Details
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-accent  transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-accent  transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Follow Us</h3>
            <div className="flex items-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent  transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent  transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent  transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent  transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
            <p className="text-muted-foreground mt-4">
              contact@example.com
            </p>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-6 text-center text-muted-foreground">
          <p>&copy; {new Date( ).getFullYear()} LMS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
