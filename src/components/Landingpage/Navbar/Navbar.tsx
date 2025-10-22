"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";
type User = {
  fullName: string;
  email: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.ok) {
            const userData = await res.json();
            setUser(userData.user);
          } else {
            Cookies.remove("token");
            setUser(null);
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    fetchUserProfile();
  }, []);
  const closeMenu = () => setIsMenuOpen(false);
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="w-[95%] mx-auto px-2 py-1 flex justify-between items-center">
        <Link href="/" onClick={closeMenu}>
          <Image
            src="/Images/LMS_logo_accent.png"
            alt="logo"
            width={50}
            height={50}
            priority
          />
        </Link>
        <div className="hidden lg:flex flex-grow justify-center">
          <ul className="flex items-center space-x-8">
            <li>
              <Link
                href="/"
                className="text-black dark:hover:text-accent dark:text-white hover:text-accent font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="text-black dark:hover:text-accent dark:text-white hover:text-accent font-medium"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/#details"
                className="text-black dark:hover:text-accent dark:text-white hover:text-accent font-medium"
              >
                Program Details
              </Link>
            </li>
            <li>
              <Link
                href="/#benefits"
                className="text-black dark:hover:text-accent dark:text-white hover:text-accent  font-medium"
              >
                Benefits
              </Link>
            </li>
            <li>
              <Link
                href="/#criteria"
                className="text-black dark:hover:text-accent dark:text-white hover:text-accent font-medium"
              >
                Selection Criteria
              </Link>
            </li>
            <li>
              <Link
                href="/#team"
                className="text-black dark:hover:text-accent dark:text-white hover:text-accent font-medium"
              >
                Our Team
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:flex items-center justify-end min-h-[52px] w-60">
          {isLoading ? (
            <div className="w-full h-10 bg-muted rounded-lg animate-pulse"></div>
          ) : user ? (
            <Link href="/profile" className="flex items-center space-x-3">
              <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-10 h-10 text-lg font-semibold">
                {user.fullName?.charAt(0)?.toUpperCase()}
              </div>
              <div className="text-left">
                <p className="font-semibold text-accent">{user.fullName}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="py-1 px-2 rounded-md  bg-transparent border border-accent text-accent hover:bg-accent   hover:text-white cursor-pointer"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="py-1 px-2 rounded-md bg-accent text-white hover:opacity-90 hover:bg-btn transition-opacity cursor-pointer"
              >
                Create free account
              </Link>
            </div>
          )}
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-in slide-in-from-top-2 duration-300">
          <div className="px-2 pt-4 pb-4 space-y-2">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="block text-black dark:hover:text-accent dark:text-white hover:text-accent  font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  onClick={closeMenu}
                  className="block text-black dark:hover:text-accent dark:text-white hover:text-accent  font-medium"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#details"
                  onClick={closeMenu}
                  className="block text-black dark:hover:text-accent dark:text-white hover:text-accent  font-medium"
                >
                  Program Details
                </Link>
              </li>
              <li>
                <Link
                  href="/#benefits"
                  onClick={closeMenu}
                  className="block text-black dark:hover:text-accent dark:text-white hover:text-accent  font-medium"
                >
                  Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="/#criteria"
                  onClick={closeMenu}
                  className="block text-black dark:hover:text-accent dark:text-white hover:text-accent  font-medium"
                >
                  Selection Criteria
                </Link>
              </li>
            </ul>
            <div className="border-t border-border pt-4 mt-4 space-y-2">
              {isLoading ? (
                <div className="w-3/4 h-12 bg-muted rounded-lg animate-pulse mx-auto"></div>
              ) : user ? (
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="flex items-center justify-center space-x-3"
                >
                  <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-10 h-10 text-lg font-semibold">
                    {user.fullName?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-accent">{user.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="btn h-10"
                  >
                    Create free account
                  </Link>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="py-2 px-2 rounded-md bg-transparent border border-accent text-accent hover:bg-accent   hover:text-white flex justify-center items-center cursor-pointer"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
