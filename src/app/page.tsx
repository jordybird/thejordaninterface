'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Existing dynamic imports
const Header = dynamic(() => import('@/components/header'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/entry-page/HeroSection'), { ssr: false });
const AboutMeMobile = dynamic(() => import('@/components/entry-page/AboutMe'), { ssr: false });
const AboutMeDesktop = dynamic(() => import('@/components/entry-page/AboutMeDesktop'), { ssr: false });
const ComingSoon = dynamic(() => import('@/components/entry-page/ComingSoon'), { ssr: false });
const SignUpForNewsletter = dynamic(() => import('@/components/entry-page/SignUpForNewsletter'), {
  ssr: false,
});
const LatestEpisodes = dynamic(() => import('@/components/entry-page/LatestEpisodes'), {
  ssr: false,
  loading: () => (
    <div className="py-16 text-center text-xl">Loading episodes...</div>
  ),
});

const ContentLibrary = dynamic(() => import('@/components/entry-page/ContentLibrary'), {
  ssr: false,
  loading: () => (
    <div className="py-16 text-center text-xl">Loading content library...</div>
  ),
});

const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <LatestEpisodes />
      <ContentLibrary />
      {/* Hide/show based on screen size */}
      <div className="md:hidden">
        <AboutMeMobile />
      </div>
      <div className="hidden md:block">
        <AboutMeDesktop />
      </div>
      
      <ComingSoon />
      <SignUpForNewsletter />
      <Footer />
    </main>
  );
}