'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import { gsap } from 'gsap';

interface Slide {
  id: number;
  image?: string;
  title: string;
  description?: string;
  buttonText?: string;
  imagePosition?: 'right' | 'left';
  type?: 'grid' | 'email' | 'book';
  subtitle?: string;
  images?: string[];
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/Headshot.png',
    title: 'The Jordan Interface Podcast',
    description:
      'This podcast provides a forum for the discussion of technology, entrepreneurship, and the complexities of modern life. Most episodes consist of 15-minute solo presentations.',
    buttonText: 'Explore More',
    imagePosition: 'right',
  },
  {
    id: 2,
    type: 'email',
    image: '/coding.png',
    title: 'Technology delivered by email',
    description:
      "Subscribe to my monthly newsletter for the latest tech, entrepreneurship, and modern life insights from my blog.",
    buttonText: 'Get Access',
  },
  {
    id: 3,
    type: 'book',
    image: '/mybook.png',
    title: 'Artifical Futures',
    subtitle: 'by Jordan Cox',
    description:
      'Uncover the future of Artificial Intelligence and its impact on your life. This guide offers a comprehensive exploration of AIs influence on the job market and the daily routines of the future. Prepare for a world shaped by intelligent technology.',
    buttonText: 'Pre-Order Now',
  },
];

// Neural Network Background Component
const NeuralNetworkBackground: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="neural-net"
        x="0"
        y="0"
        width="50"
        height="50"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="25" cy="25" r="2" fill="white" />
        <line
          x1="25"
          y1="25"
          x2="50"
          y2="25"
          stroke="white"
          strokeWidth="0.5"
        />
        <line
          x1="25"
          y1="25"
          x2="25"
          y2="50"
          stroke="white"
          strokeWidth="0.5"
        />
        <line
          x1="25"
          y1="25"
          x2="50"
          y2="50"
          stroke="white"
          strokeWidth="0.5"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#neural-net)" />
  </svg>
);

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const sliderRef = useRef<HTMLDivElement>(null);
  const prevSlideRef = useRef<HTMLDivElement>(null);
  const nextSlideRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add your email submission logic here
      console.log('Email submitted:', email);
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  const nextSlideHandler = () => {
    if (!isAnimatingRef.current) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlideHandler = () => {
    if (!isAnimatingRef.current) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({
      onStart: () => {
        isAnimatingRef.current = true;
      },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    const currentSlideContent = prevSlideRef.current;
    const newSlideContent = nextSlideRef.current;

    tl.to(currentSlideContent, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    })
      .to(
        sliderRef.current,
        {
          x: `${-currentSlide * 100}%`,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        0
      )
      .fromTo(
        newSlideContent,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.3
      );

    return () => {
      tl.kill();
    };
  }, [currentSlide]);

  return (
    <section className="pt-24 pb-8 bg-white px-4 md:pt-24 md:pb-16 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-700 ease-in-out"
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="min-w-full relative h-[500px] md:h-[600px]"
              >
                {slide.type === 'email' ? (
                  // Email subscription slide
                  <div className="absolute inset-0 bg-[#0a0a0a] flex items-center">
                    <div className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
                      <div className="w-full md:w-1/2 pr-0 md:pr-8">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-white/90">
                          {slide.description}
                        </p>
                        <form
                          onSubmit={handleEmailSubmit}
                          className="flex flex-col md:flex-row gap-4"
                        >
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00bfff]"
                            required
                          />
                          <button
                            type="submit"
                            className="px-8 py-4 bg-[#00bfff] hover:bg-[#00a6e6] transition-colors rounded-full text-white font-semibold whitespace-nowrap"
                          >
                            {slide.buttonText}
                          </button>
                        </form>
                        <p className="mt-6 text-sm text-white/75 italic">
                          By submitting your email to subscribe, you agree to our
                          Privacy Policy
                        </p>
                      </div>
                      {/* Modified Image Container */}
                      <div className="hidden md:block w-1/2 flex justify-end items-center pl-16">
                        {/* Increased padding-left to move image further right */}
                        <img
                          src={slide.image}
                          alt="Technology"
                          className="w-3/4 h-auto object-cover rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                ) : slide.type === 'book' ? (
                  // Book promotion slide
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center overflow-hidden">
                    <NeuralNetworkBackground />
                    <div className="relative w-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
                      <div className="w-full md:w-1/2 text-white z-10">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                          {slide.title}
                        </h1>
                        <div className="mb-6">
                          <span className="text-2xl text-blue-200">
                            {slide.subtitle}
                          </span>
                        </div>
                        <p className="text-lg md:text-xl mb-8 text-blue-50 max-w-xl leading-relaxed">
                          {slide.description}
                        </p>
                        <a
                          href="#pre-order"
                          className="inline-block px-8 py-4 bg-white text-blue-900 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
                        >
                          {slide.buttonText}
                        </a>
                      </div>
                      <div className="hidden md:block w-1/2 relative">
                        <div className="relative w-full h-full flex justify-center items-center">
                          {/* Updated Image: Larger and Straight On */}
                          <img
                            src={slide.image}
                            alt="Book Cover"
                            className="w-full h-full max-w-lg object-contain shadow-2xl rounded-lg"
                            style={{
                              boxShadow:
                                '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            }}
                          />
                          {/* Optional Background Effect */}
                          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-blue-600/20 blur-3xl rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Default slide type
                  <>
                    <div className="absolute inset-0 hidden md:block">
                      {slide.type === 'grid' ? (
                        <div className="grid grid-cols-2 gap-1 h-full">
                          {slide.images?.map((image, i) => (
                            <img
                              key={i}
                              src={image}
                              alt={`Event ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ))}
                        </div>
                      ) : (
                        <div
                          className={`w-full h-full flex ${
                            slide.imagePosition === 'right'
                              ? 'justify-end pr-12'
                              : 'justify-start pl-12'
                          }`}
                        >
                          {slide.id === 1 ? (
                            <div
                              className="absolute top-32 right-12 w-[35%] h-[75%]"
                              style={{
                                boxShadow:
                                  '0 0 60px rgba(0, 0, 0, 0.7), 0 30px 60px rgba(0, 0, 0, 0.8)',
                                borderRadius: '24px',
                                background:
                                  'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4))',
                              }}
                            >
                              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                                <div className="absolute inset-0 bg-black opacity-30">
                                  <div
                                    className="absolute inset-0"
                                    style={{
                                      background:
                                        'radial-gradient(circle at bottom left, transparent 0%, rgba(0,0,0,0.4) 100%), radial-gradient(circle at bottom right, transparent 0%, rgba(0,0,0,0.4) 100%)',
                                    }}
                                  />
                                </div>
                                <div className="relative w-full h-full">
                                  <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover object-center filter contrast-125"
                                  />
                                </div>
                                <div
                                  className="absolute bottom-0 left-0 right-0 h-32"
                                  style={{
                                    background:
                                      'linear-gradient(to top, rgb(0, 0, 0) 10%, rgba(0,0,0,0.8) 50%, transparent 100%)',
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <img
                              src={slide.image}
                              alt={slide.title}
                              className="w-full h-full object-cover opacity-90"
                            />
                          )}
                        </div>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-[#0a0a0a] md:hidden" />

                    <div className="relative h-full px-6 md:px-12">
                      <div
                        className={`h-full flex flex-col justify-start pt-16 slide-content ${
                          slide.imagePosition === 'right'
                            ? 'md:w-2/3'
                            : 'w-full'
                        } relative`}
                        ref={
                          index === currentSlide
                            ? nextSlideRef
                            : prevSlideRef
                        }
                      >
                        <h1
                          className="hero-title text-3xl md:text-6xl font-medium mb-6 text-white"
                          style={{
                            fontWeight: 550,
                            lineHeight: '1.1',
                          }}
                        >
                          {slide.id === 1 ? (
                            <>
                              The Jordan Interface
                              <br />
                              Podcast
                            </>
                          ) : (
                            slide.title
                          )}
                        </h1>

                        {slide.description && (
                          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl">
                            {slide.description}
                          </p>
                        )}

                        {slide.buttonText && (
                          slide.id === 1 ? (
                            <div className="absolute bottom-4 right-4 md:static">
                              <a
                                href="/show"
                                className="slide-button bg-[#8a2be2] text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold w-fit hover:bg-[#7424c9] transition-colors inline-block"
                              >
                                {slide.buttonText}
                              </a>
                            </div>
                          ) : (
                            <button className="slide-button bg-[#8a2be2] text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold w-fit hover:bg-[#7424c9] transition-colors">
                              {slide.buttonText}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="mt-6 md:mt-8 flex flex-row justify-between items-center px-4 md:px-0">
          {/* Pagination Dots on the Left */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 md:w-2.5 md:h-2.5 rounded-full transition-colors ${
                  currentSlide === index
                    ? 'bg-[#8a2be2]'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows on the Right */}
          <div className="flex gap-4">
            <button
              onClick={prevSlideHandler}
              className="transition-colors text-gray-400 hover:text-[#8a2be2]"
              aria-label="Previous Slide"
            >
              <ChevronLeftCircle size={38} />
            </button>
            <button
              onClick={nextSlideHandler}
              className="transition-colors text-gray-400 hover:text-[#8a2be2]"
              aria-label="Next Slide"
            >
              <ChevronRightCircle size={38} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
