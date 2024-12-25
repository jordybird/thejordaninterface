'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const BlogHero = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would add your API call to save the email
      // For example:
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      console.log('Email submitted:', email);
      
      // Navigate to thank you page
      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting email:', error);
      // Add error handling here if needed
    }
  };

  return (
    <section className="bg-[#0a0a0a] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-[1.1]">
            Subscribe to the Interface Blog
          </h1>

          {/* Description */}
          <p className="text-xl mb-8 leading-snug opacity-90">
            Tech. Entrepreneurship. Life. And the honest reflections in between. 
            The Innerverse is a personal journal and insightful blog, offering 
            a unique perspective on building success and finding balance. 
            Subscribe to get exclusive content delivered straight to your inbox.
          </p>

          {/* Email Signup Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-6 py-4 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00bfff] text-lg"
              required
            />
            <button
              type="submit"
              className="slide-buttonn px-8 py-4 bg-[#00bfff] hover:bg-[#00a6e6] transition-colors rounded-full font-semibold text-lg whitespace-nowrap"
            >
              Get Access
            </button>
          </form>

          {/* Privacy Notice */}
          <p className="mt-6 text-sm opacity-75 italic">
            By submitting your email to subscribe, you agree to our{' '}
            <a href="/privacy" className="underline hover:text-[#00bfff] transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;