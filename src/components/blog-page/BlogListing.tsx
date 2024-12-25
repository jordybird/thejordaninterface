'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { blog } from '@/app/data/blog/blog';

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const BlogListing = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-16 py-8 md:py-16">
      {/* Header with Title and Filter */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-12 space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-4xl font-bold text-[#28282B]">The Vault</h1>
        
        <div className="flex items-center gap-2">
          <span className="text-black font-semibold text-sm md:text-base">Sort by</span>
          <div className="relative flex-1" ref={dropdownRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between px-3 md:px-4 py-2 border-2 border-black rounded-full w-full md:min-w-[180px]"
            >
              <span className="text-black font-semibold text-sm md:text-base">
                {sortOrder === 'newest' ? 'Date: Newest first' : 'Date: Oldest first'}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform text-black ml-2 ${isFilterOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-full md:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button 
                  onClick={() => {
                    setSortOrder('newest');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-black ${sortOrder === 'newest' ? 'font-bold' : 'font-normal'} text-sm md:text-base`}
                >
                  Date: Newest first
                </button>
                <button 
                  onClick={() => {
                    setSortOrder('oldest');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-[#28282B] ${sortOrder === 'oldest' ? 'font-bold' : 'font-normal'} text-sm md:text-base`}
                >
                  Date: Oldest first
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog listings */}
      <div className="w-full">
        <div className="group border-b border-gray-200">
          <Link href={`/blog/${createSlug(blog.title)}`}>
            <div className="flex flex-col md:flex-row md:items-center w-full py-6 md:py-8">
              {/* Date */}
              <div className="w-full md:w-48 md:flex-shrink-0 mb-2 md:mb-0">
                <p className="text-sm md:text-lg text-[#28282B]">
                  {formatDate(blog.date)}
                </p>
              </div>
              
              {/* Title and Arrow */}
              <div className="flex items-center justify-between w-full md:pl-32">
                <h2 className="text-base md:text-xl font-bold text-[#28282B] pr-4 md:pr-12 hover:text-[#8a2be2]">
                  {blog.title}
                </h2>

                <svg 
                  className="w-5 h-5 md:w-6 md:h-6 text-[#28282B] transform group-hover:translate-x-1 transition-all flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8 md:mt-16">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0099FF] text-white">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600">
          3
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BlogListing;