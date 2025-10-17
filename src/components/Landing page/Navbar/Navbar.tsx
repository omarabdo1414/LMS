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
  const [tokenData, setTokenData] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      try {
        setTokenData(JSON.parse(savedToken));
      } catch (error) {
        console.error("Failed to parse token from cookie:", error);
        Cookies.remove("token");
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <nav className="sticky top-0 z-50 shadow-sm bg-[#f5f6fa]">
      <div className="container mx-auto px-3 py-3 md:py-3 flex justify-between items-center">
    
        <Link href="#home">
          <Image
            src="/Images/logo.png"
            alt="logo"
            width={70}
            height={50}
            priority
          />
        </Link>

      
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                href="#home"
                className="text-[[var(--main-hero)]] hover:text-[#3b82f6] transition-colors font-medium cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="text-[[var(--main-hero)]] hover:text-[#3b82f6] transition-colors font-medium cursor-pointer"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#details"
                className="text-[[var(--main-hero)]] hover:text-[#3b82f6] transition-colors font-medium cursor-pointer"
              >
                Program Details
              </Link>
            </li>
            <li>
              <Link
                href="#benefits"
                className="text-[[var(--main-hero)]] hover:text-[#3b82f6] transition-colors font-medium cursor-pointer"
              >
                Benefits
              </Link>
            </li>
            <li>
              <Link
                href="#criteria"
                className="text-[[var(--main-hero)]] hover:text-[#3b82f6] transition-colors font-medium cursor-pointer"
              >
                Selection Criteria
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center justify-end min-h-[52px] w-60">
          {isLoading ? (
            <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          ) : tokenData ? (
            <Link href="/profile" className="flex items-center space-x-3">
              <div className="flex items-center justify-center bg-[#ADD8E6] text-[[var(--main-hero)]] rounded-full w-10 h-10 text-lg font-semibold">
                {tokenData.fullName?.charAt(0)?.toUpperCase()}
              </div>
              <div className="text-left">
                <p className="font-semibold text-[[var(--main-hero)]]">
                  {tokenData.fullName}
                </p>
                <p className="text-sm text-gray-500">{tokenData.email}</p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="px-2 py-2 bg-[var(--hover)] text-white font-semibold rounded-2xl shadow-md hover:bg-[var(--main-hero)] transition-all">
                Login
              </Link>
              <Link
                href="/signup"
                className="px-2 py-1 bg-[var(--main-hero)] text-white font-semibold rounded-2xl shadow-md hover:bg-[var(--hover)] transition-all">
                Create free account
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-[[var(--main-hero)]] border-t border-[[var(--main-hero)]] animate-in slide-in-from-top-2 duration-300">
          <div className="px-4 pt-4 pb-4 space-y-3">
            <ul className="space-y-4">
              <li>
                <Link
                  href="#home"
                  className="block text-center text-lg text-white hover:text-[#ADD8E6]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="block text-center text-lg text-white hover:text-[#ADD8E6]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#details"
                  className="block text-center text-lg text-white hover:text-[#ADD8E6]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Program Details
                </Link>
              </li>
              <li>
                <Link
                  href="#benefits"
                  className="block text-center text-lg text-white hover:text-[#ADD8E6]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="#criteria"
                  className="block text-center text-lg text-white hover:text-[#ADD8E6]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Selection Criteria
                </Link>
              </li>
            </ul>

            <div className="border-t border-gray-500 pt-4 space-y-3">
              {isLoading ? (
                <div className="w-3/4 h-12 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
              ) : tokenData ? (
                <Link
                  href="/profile"
                  className="flex items-center justify-center space-x-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center justify-center bg-[#ADD8E6] text-[[var(--main-hero)]] rounded-full w-10 h-10 text-lg font-semibold">
                    {tokenData.fullName?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="text-left text-white">
                    <p className="font-semibold">{tokenData.fullName}</p>
                    <p className="text-sm text-gray-300">{tokenData.email}</p>
                  </div>
                </Link>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="block w-full text-center bg-[#ADD8E6] text-[[var(--main-hero)]] py-3 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create free account
                  </Link>
                  <Link
                    href="/login"
                    className="block w-full text-center bg-transparent text-white font-semibold py-3 rounded-lg border border-white hover:bg-[#ADD8E6] hover:text-[[var(--main-hero)]]"
                    onClick={() => setIsMenuOpen(false)}
                  >
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
