// Navbar
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function Navbar() {
    return (
    <>
    <nav className=" border-b border-border">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80">
            <Image src="/Images/logo.avif" alt='logo' width={100} height={70}/>
        </Link>
        <ul className="hidden md:flex items-center space-x-6">
            <li><Link href="/" className="text-foreground hover:text-primary">Home</Link></li>
            <li><Link href="#about" className="text-foreground hover:text-primary">About Us</Link></li>
            <li><Link href="#details" className="text-foreground hover:text-primary">Program Details</Link></li>
            <li><Link href="#benefits" className="text-foreground hover:text-primary">Benefits</Link></li>
            <li><Link href="#criteria" className="text-foreground hover:text-primary">Selection Criteria</Link></li>
        </ul>
        <div className="flex items-center space-x-4">
            <Link href="/login" className="bg-primary text-white py-2 px-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
            Login
            </Link>
            <Link href="/register" className="bg-green-500 text-white  py-2 px-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
            Create free account
            </Link>
        </div>
        
    </div>
    </nav>
    </>
    )
}


