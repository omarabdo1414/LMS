"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 
type User = {
  fullName: string;
  email: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About Us" },
    { href: "/#details", label: "Program Details" },
    { href: "/#benefits", label: "Benefits" },
    { href: "/#criteria", label: "Selection Criteria" },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-2 py-1 flex justify-between items-center">
        <Link href="/">
          <Image src="/Images/logo.avif" alt="logo" width={100} height={70} priority />
        </Link>
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-foreground hover:text-primary transition-colors font-medium">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center justify-end min-h-[52px] w-60">
          {isLoading ? (
            <div className="w-full h-10 bg-muted rounded-lg animate-pulse"></div>
          ) : user ? (
            <Link href="/profile" className="flex items-center space-x-3">
              <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-10 h-10 text-lg font-semibold">
                {user.fullName?.charAt(0)?.toUpperCase()}
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">{user.fullName}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login" className="text-foreground font-semibold py-2 px-4 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                Login
              </Link>
              <Link href="/signup" className=" py-2 px-2 rounded-lg  bg-green-600 text-white  hover:opacity-90 transition-opacity cursor-pointer">
                Create free account
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden cursor-pointer">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-in slide-in-from-top-2 duration-300">
          <div className="px-2 pt-4 pb-4 space-y-2">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block text-center text-lg text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-border pt-4 space-y-2">
              {isLoading ? (
                <div className="w-3/4 h-12 bg-muted rounded-lg animate-pulse mx-auto"></div>
              ) : user ? (
                <Link href="/profile" className="flex items-center justify-center space-x-3">
                  <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-10 h-10 text-lg font-semibold">
                    {user.fullName?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{user.fullName}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </Link>
              ) : (
                <>
                  <Link href="/signup" className="block w-full text-center bg-green-600 text-white   py-2 rounded-lg">
                    Create free account
                  </Link>
                  <Link href="/login" className="block w-full text-center bg-muted text-foreground font-semibold py-3 rounded-lg">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
