"use client";

import React, { useState, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SearchOverlay from './overlay/SearchOverlay';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchOpenedFromMenu, setSearchOpenedFromMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isMenuOpen && menuRef.current && menuContentRef.current) {
      // Menu background animation
      gsap.to(menuRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        display: "block",
      });

      // Menu content animation with type assertion for HTMLElement
      const children = Array.from(menuContentRef.current.children) as HTMLElement[];
      gsap.from(children, {
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

  // Handle search input click from menu
  const handleSearchInputClick = () => {
    setSearchOpenedFromMenu(true);
    setIsSearchOpen(true);
    setIsMenuOpen(false);
  };

  // Handle search click from header
  const handleHeaderSearchClick = () => {
    setSearchOpenedFromMenu(false);
    setIsSearchOpen(true);
  };

  // Handle search close
  const handleSearchClose = () => {
    setIsSearchOpen(false);
    if (searchOpenedFromMenu) {
      setIsMenuOpen(true);
    }
    setSearchOpenedFromMenu(false);
  };

  return (
    <div ref={scope}>
      <header className="fixed top-0 left-0 right-0 bg-white z-50 px-6 h-20 flex items-center">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img 
              src="/JordanInterface.png" 
              alt="Logo" 
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6 ml-12">
            <a href="/projects" className="text-md font-semibold text-[#28282B] hover:text-[#00bfff] transition-colors">Projects</a>
            <a href="/show" className="text-md font-semibold text-[#28282B] hover:text-[#00bfff] transition-colors">Podcast</a>
            <a href="/blog" className="text-md font-semibold text-[#28282B] hover:text-[#00bfff] transition-colors">Blog</a>
            <a href="/content" className="text-md font-semibold text-[#28282B] hover:text-[#00bfff] transition-colors">Content</a>
            <a href="/about" className="text-md font-semibold text-[#28282B] hover:text-[#00bfff] transition-colors">About</a>
          </nav>

          {/* Desktop CTA Buttons and Search */}
          <div className="hidden xl:flex items-center space-x-4 ml-auto">
            <button className="slide-button py-2.5 px-5 bg-[#8a2be2] text-white text-sm rounded-full hover:bg-[#7a1ed2] transition-colors font-semibold whitespace-nowrap">
              Do cool shit? Contact me.
            </button>
            
            <button 
              onClick={handleHeaderSearchClick}
              className="flex items-center text-[#28282B] hover:text-[#00bfff] transition-colors"
            >
              <span className="text-md font-bold mr-2">Search</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden text-[#28282B] hover:text-[#00bfff] transition-colors text-lg font-semibold focus:outline-none ml-auto"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-white z-40 xl:hidden"
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
                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:border-[#00bfff] text-lg cursor-pointer"
                onClick={handleSearchInputClick}
                readOnly
              />
              <button 
                className="absolute right-6 top-1/2 transform -translate-y-1/2 hover:text-[#00bfff] transition-colors"
                onClick={handleSearchInputClick}
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="space-y-8">
            <a href="/projects" className="block text-2xl font-semibold text-[#28282B] hover:text-[#00bfff] transition-colors">Projects</a>
            <a href="/show" className="block text-2xl font-semibold text-[#28282B] hover:text-[#00bfff] transition-colors">Podcast</a>
            <a href="/blog" className="block text-2xl font-semibold text-[#28282B] hover:text-[#00bfff] transition-colors">Blog</a>
            <a href="/content" className="block text-2xl font-semibold text-[#28282B] hover:text-[#00bfff] transition-colors">Content</a>
            <a href="/about" className="block text-2xl font-semibold text-[#28282B] hover:text-[#00bfff] transition-colors">About</a>
          </nav>
          
          {/* Mobile CTA Buttons */}
          <div className="mt-16 space-y-4">
            <button className="slide-button w-full py-4 px-6 bg-[#8a2be2] text-white rounded-full transition-colors text-lg font-semibold">
              Do cool shit? Contact me.
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={handleSearchClose}
      />
    </div>
  );
};

export default Header;