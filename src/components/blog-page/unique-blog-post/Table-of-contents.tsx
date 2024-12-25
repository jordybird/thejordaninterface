// src/components/blog-page/unique-blog-post/Table-of-contents.tsx
'use client';

import { useEffect, useState } from 'react';

interface TableOfContentsProps {
  subtitles: {
    subtitle: string;
    content: string;
  }[];
  onItemClick?: () => void; // Added callback for mobile dropdown close
}

export default function TableOfContents({ subtitles, onItemClick }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = subtitles.map(({ subtitle }) => 
        document.getElementById(subtitle.toLowerCase().replace(/\s+/g, '-'))
      );

      let currentSection = '';
      sections.forEach((section) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const offset = isMobile ? 250 : 150; // Adjusted offset for mobile
        if (rect.top <= offset && rect.bottom >= offset) {
          currentSection = section.id;
        }
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [subtitles, isMobile]);

  const scrollToSection = (subtitle: string) => {
    const id = subtitle.toLowerCase().replace(/\s+/g, '-');
    const element = document.getElementById(id);
    if (element) {
      const offset = isMobile ? 200 : 100; // Adjusted offset for mobile header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close dropdown in mobile view
      if (isMobile && onItemClick) {
        onItemClick();
      }
    }
  };

  return (
    <div className={isMobile ? '' : 'sticky top-8'}>
      {!isMobile && (
        <div className="bg-white pb-4">
          <h2 className="font-bold text-base text-[#28282B] mb-4">Table of Contents</h2>
        </div>
      )}
      <div className={isMobile ? 'border-t border-gray-200' : 'border-l-2 border-gray-200 pl-4'}>
        <nav className={`flex flex-col ${isMobile ? 'py-2' : 'space-y-3'}`}>
          {subtitles.map(({ subtitle }) => {
            const id = subtitle.toLowerCase().replace(/\s+/g, '-');
            return (
              <button
                key={subtitle}
                onClick={() => scrollToSection(subtitle)}
                className={`text-left hover:text-[#8a2be2] transition-colors duration-200 
                  ${isMobile ? 'py-2 text-lg font-semibold' : 'text-lg'}
                  ${activeSection === id
                    ? 'text-[#8a2be2] font-semibold'
                    : 'text-gray-600'
                  }`}
              >
                {subtitle}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}