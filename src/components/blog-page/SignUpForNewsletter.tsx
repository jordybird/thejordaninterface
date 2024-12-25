// src/components/blog-page/SignUpForNewsletter.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const SignUpForNewsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter signup logic here (e.g., API call)
    // For demonstration, we'll just set submitted to true
    setSubmitted(true);
  };

  return (
    <section className="bg-[#00bfff]">
      <div className="max-w-7xl mx-auto px-4 md:pl-8 md:pr-12 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text Content */}
          <div className="w-full md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="block">Sign Up For The</span>
              <span className="block">Interface</span>
            </h2>
            
            <p className="text-lg text-white/90 mt-6 max-w-xl">
              Stay updated with the latest insights on tech, 
              entrepreneurship, and work life management. Get exclusive content 
              and early access to my systems.
            </p>
            
            <form onSubmit={handleSubmit} className="mt-14">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-6 py-3.5 rounded-full bg-white text-[#28282B] 
                           border border-white/20 focus:outline-none focus:border-[#8a2be2]
                           w-full sm:w-96"
                />
                <button 
                  type="submit"
                  className="slide-buttonn bg-[#28282B] text-white px-8 py-3.5 
                           rounded-full text-base font-semibold"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Image */}
          <div className="w-[95vw] md:w-2/4 -mx-4 md:mx-0 md:px-4 -mt-2 -mb-14">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
              <Image
                src="/coding.png"
                alt="Coding Illustration"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForNewsletter;
