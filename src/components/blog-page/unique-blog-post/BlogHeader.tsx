// src/components/blog-page/unique-blog-post/BlogHeader.tsx
'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BlogHeaderProps {
  title: string;
  date: string;
}

export default function BlogHeader({ title, date }: BlogHeaderProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      {/* Breadcrumb */}
      {isMobile ? (
        <div className="flex flex-col space-y-1">
          <Link 
            href="/blog" 
            className="text-[#28282B] font-bold hover:text-gray-700"
          >
            The Interface Blog
          </Link>
          <span className="text-gray-500">{title}</span>
        </div>
      ) : (
        <div className="flex items-center text-base space-x-2">
          <Link 
            href="/blog" 
            className="text-gray-900 font-bold hover:text-gray-700"
          >
            The Interface Blog
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-500 truncate">{title}</span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.1]">
        {title}
      </h1>

      {/* Date */}
      <time className="text-lg text-[#28282B]">
        {date}
      </time>
    </div>
  );
}