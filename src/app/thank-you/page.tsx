'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/header';

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-[#28282B] flex items-center justify-center px-6 mt-16">
        <div className="max-w-2xl mx-auto py-16">
          {/* Main Title - keep centered */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#28282B]">
              Thanks! Welcome to the Innerverse.
            </h1>
          </div>
          
          {/* Email Instructions Box */}
          <div className="border border-[#8a2be2] rounded-lg p-8 mb-12">
            <p className="text-lg mb-6">
              Expect an email shortly with a link to your download.
            </p>
            
            <p className="text-lg mb-4">
              Add <span className="font-bold">interface@jordnn.com</span> to your contacts
              to ensure you receive our emails. Here are{' '}
              <Link href="/email-instructions" className="text-[#8a2be2] underline hover:text-[#00a6e6]">
                instructions
              </Link>{' '}
              for popular email clients.
            </p>
          </div>
          
          {/* Newsletter Info */}
          <p className="text-lg mb-12">
            I will send the Interface newsletter monthly with exclusive content,
            insights, and resources.
          </p>
          
          {/* Share Section */}
          <p className="text-lg mb-16">
            If you know someone who might want to join the Interface,
            you can{' '}
            <Link href="/" className="text-[#8a2be2] underline hover:text-[#00a6e6]">
              share this link
            </Link>{' '}
            with them or{' '}
            <Link href="https://twitter.com/intent/tweet" className="text-[#8a2be2] underline hover:text-[#00a6e6]">
              share that you joined on X
            </Link>.
          </p>
          
          {/* Closing */}
          <p className="text-lg mb-8">
            Welcome to the Interface and as always, thank you for your
            interest in personal growth!
          </p>
          
          {/* Signature */}
          <div>
            <p className="mb-2 text-lg">Best wishes,</p>
            <p className="text-lg">Jordan</p>
          </div>
        </div>
      </div>
    </>
  );
}