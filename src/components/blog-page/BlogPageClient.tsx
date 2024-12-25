// src/components/blog-page/BlogPageClient.tsx
'use client';

import { useState, useEffect } from 'react';
import TableOfContents from '@/components/blog-page/unique-blog-post/Table-of-contents';
import { blog } from '@/app/data/blog/blog';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function BlogPageClient() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 300); // Increased scroll threshold
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className=" md:mt-16 flex flex-col md:flex-row gap-12 relative">
      {/* Mobile Table of Contents */}
      {isMobile && (
        <div className={`mt-6 ${hasScrolled ? 'fixed top-0 left-0 right-0 z-10 bg-white px-8 py-4 shadow-md' : ''}`}>
          <button
            onClick={() => setIsTableOpen(!isTableOpen)}
            className="w-full flex items-center justify-between py-2 text-[#28282B]"
            aria-expanded={isTableOpen}
            aria-controls="mobile-toc"
          >
            <span className="font-semibold text-lg">Table of Contents</span>
            {isTableOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {isTableOpen && (
            <div id="mobile-toc" className="mt-2 max-h-64 overflow-y-auto">
              <TableOfContents 
                subtitles={blog.subtitles} 
                onItemClick={() => setIsTableOpen(false)}
              />
            </div>
          )}
        </div>
      )}

      {/* Desktop Table of Contents */}
      {!isMobile && (
        <div className="w-72 shrink-0">
          <TableOfContents subtitles={blog.subtitles} />
        </div>
      )}

      {/* Blog Content */}
      <div className="flex-1 max-w-3xl space-y-12 pb-24">
        {blog.subtitles.map(({ subtitle, content }) => (
          <section
            key={subtitle}
            id={subtitle.toLowerCase().replace(/\s+/g, '-')}
            className="prose max-w-none"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#28282B]">{subtitle}</h2>
            <p className="text-lg text-[#28282B]">{content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
