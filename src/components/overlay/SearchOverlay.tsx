import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Search, X, ArrowRight, Clock, Star, Bookmark } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scope = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  useGSAP(() => {
    if (isOpen && overlayRef.current && contentRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        display: "block",
      });

      const children = Array.from(contentRef.current.children) as HTMLElement[];
      gsap.from(children, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });
    } else if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { display: "none" });
          }
        }
      });
    }
  }, { scope, dependencies: [isOpen] });

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, isOpen]);

  const recentSearches = [
    "Latest newsletter",
    "Podcast episode #42",
    "Development protocols"
  ];

  return (
    <div ref={scope}>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-white z-50"
        style={{ opacity: 0, display: 'none' }}
      >
        <div className="max-w-7xl mx-auto px-6 pt-8">
          {/* Header with Logo and Close Button */}
          <div className="flex justify-between items-center mb-8">
            <img 
              src="/logo.png" 
              alt="Jordan Interface Logo" 
              className="h-10 w-auto"
            />
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close search"
            >
              <X className="w-8 h-8 text-[#28282B]" />
            </button>
          </div>

          <div ref={contentRef} className="space-y-12">
            {/* Centered Search Title */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-semibold text-[#28282B]">
                Search The Jordan Interface
              </h1>
            </div>

            {/* Search Input */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full pl-16 pr-24 py-5 text-xl text-[#28282B] rounded-2xl border-2 border-gray-200 
                           focus:outline-none focus:border-[#8a2be2] focus:ring-2 focus:ring-[#8a2be2]/10 
                           placeholder-gray-400 transition-all duration-200"
                />
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center">
                  <kbd className="hidden sm:inline-flex items-center px-3 py-1 mr-2 text-sm text-gray-500 bg-gray-100 
                                rounded-lg">⏎ return</kbd>
                </div>
              </div>
            </div>

            {/* Recent Searches Section */}
            {!searchQuery && (
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-lg font-semibold text-[#28282B] mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Searches
                </h2>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 rounded-full bg-purple-50 text-[#28282B] border-2 border-[#8a2be2] 
                               hover:bg-[#8a2be2] hover:text-white
                               transition-colors duration-200 text-sm flex items-center"
                    >
                      {search}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Content Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Newsletter Section */}
              <div className="group">
                <h2 className="text-2xl font-bold mb-6 text-[#28282B] flex items-center">
                  Newsletter
                  <Star className="w-5 h-5 ml-2 text-yellow-500" />
                </h2>
                <ul className="space-y-4">
                  {['Latest Post', 'Featured Articles', 'Topics'].map((item, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="flex items-center text-lg text-[#28282B] hover:text-[#8a2be2]
                                 transition-colors duration-200 group"
                      >
                        <span>{item}</span>
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 
                                           transition-opacity duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Podcast Section */}
              <div className="group">
                <h2 className="text-2xl font-bold mb-6 text-[#28282B] flex items-center">
                  Podcast
                  <Bookmark className="w-5 h-5 ml-2 text-blue-500" />
                </h2>
                <ul className="space-y-4">
                  {['Latest Episodes', 'Featured Episodes', 'Categories'].map((item, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="flex items-center text-lg text-[#28282B] hover:text-[#8a2be2]
                                 transition-colors duration-200 group"
                      >
                        <span>{item}</span>
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 
                                           transition-opacity duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Protocols Section */}
              <div className="group">
                <h2 className="text-2xl font-bold mb-6 text-[#28282B] flex items-center">
                  Protocols
                  <Star className="w-5 h-5 ml-2 text-purple-500" />
                </h2>
                <ul className="space-y-4">
                  {['Latest Protocols', 'Popular Protocols', 'Categories'].map((item, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="flex items-center text-lg text-[#28282B] hover:text-[#8a2be2]
                                 transition-colors duration-200 group"
                      >
                        <span>{item}</span>
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 
                                           transition-opacity duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;