import React, { useState, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const scope = useRef(null);

  useGSAP(() => {
    if (isMenuOpen && menuRef.current && menuContentRef.current) {
      // Menu background animation
      gsap.to(menuRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        display: "block",
      });

      // Menu content animation
      gsap.from(menuContentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });
    } else if (menuRef.current) {
      // Reverse animations
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) {
            gsap.set(menuRef.current, { display: "none" });
          }
        }
      });
    }
  }, { scope, dependencies: [isMenuOpen] });

  return (
    <div ref={scope}>
      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50 px-6 h-24 flex items-center justify-between ">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img 
            src="/Mustard%20Seed%20Plant%20(1).svg" 
            alt="Logo" 
            className="h-16 w-auto"
          />
        </a>

        {/* Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#28282B] hover:text-[#28282B]/80 transition-colors text-lg font-semibold"
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {/* Fullscreen Menu */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-white z-40"
        style={{ opacity: 0, display: 'none' }}
      >
        <div 
          ref={menuContentRef}
          className="max-w-4xl mx-auto px-6 pt-32"
        >
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:border-[#28282B] text-lg"
              />
              <button className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-8">
            <a href="#" className="block text-2xl font-semibold text-[#28282B] hover:text-[#28282B]/80 transition-colors">Projects</a>
            <a href="#" className="block text-2xl font-semibold text-[#28282B] hover:text-[#28282B]/80 transition-colors">Podcast</a>
            <a href="#" className="block text-2xl font-semibold text-[#28282B] hover:text-[#28282B]/80 transition-colors">Newsletter</a>
            <a href="#" className="block text-2xl font-semibold text-[#28282B] hover:text-[#28282B]/80 transition-colors">Shoutouts</a>
            <a href="#" className="block text-2xl font-semibold text-[#28282B] hover:text-[#28282B]/80 transition-colors">Companies</a>
            <a href="#" className="block text-2xl font-semibold text-[#28282B] hover:text-[#28282B]/80 transition-colors">About</a>
          </nav>

          {/* CTA Buttons */}
          <div className="mt-16 space-y-4">
            
          <button className="w-full py-4 px-6 bg-[#8a2be2] text-white rounded-full hover:bg-[#7a1ed2] transition-colors text-lg font-semibold">
  Do cool shit? Contact me.
</button>
<button className="w-full py-4 px-6 bg-[#00bfff] text-white rounded-full hover:bg-[#0099cc] transition-colors text-lg font-semibold">
  Become a Member
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;