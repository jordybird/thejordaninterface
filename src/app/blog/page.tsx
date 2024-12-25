'use client';

import React, { useState } from 'react';
import Header from '@/components/blog-page/Header';
import BlogHero from '@/components/blog-page/Blog-hero';
import BlogListing from '@/components/blog-page/BlogListing';
import SignUpForNewsletter from '@/components/blog-page/SignUpForNewsletter';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Header />
      {/* Hero section with full-width black background */}
      <div className="w-full bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-16">
          <BlogHero />
        </div>
      </div>

      {/* Blog listing section */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-16">
        <BlogListing />
      </div>

      {/* Newsletter signup section */}
      <SignUpForNewsletter />

      {/* Footer */}
      <Footer />
    </>
  );
}