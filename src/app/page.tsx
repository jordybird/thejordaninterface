'use client'

import React from 'react';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header'), {
  ssr: false
});

const HeroSection = dynamic(() => import('@/components/entry-page/HeroSection'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="h-screen flex items-center justify-center">
        <div className="text-[#28282B] text-xl">Loading...</div>
      </div>
    </div>
  ),
});

const AboutMe = dynamic(() => import('@/components/entry-page/AboutMe'), {
  ssr: false,
  loading: () => (
    <div className="py-16 px-4 bg-white animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="h-[600px] bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  ),
});

const ComingSoon = dynamic(() => import('@/components/entry-page/ComingSoon'), {
  ssr: false,
  loading: () => (
    <div className="py-16 px-4 bg-[#00BFFF] animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="h-[400px] bg-sky-300 rounded-lg"></div>
      </div>
    </div>
  ),
});

const SignUpForNewsletter = dynamic(() => import('@/components/entry-page/SignUpForNewsletter'), {
  ssr: false,
  loading: () => (
    <div className="py-16 px-4 bg-gradient-to-r from-[#0A0A0A] to-neutral-800 animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="h-[400px] bg-neutral-800/50 rounded-lg"></div>
      </div>
    </div>
  ),
});


export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <AboutMe />
      <ComingSoon />
      <SignUpForNewsletter />
    </main>
  );
}