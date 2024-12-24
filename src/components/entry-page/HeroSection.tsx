// app/components/HeroSection.tsx

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import { gsap } from 'gsap';

interface Slide {
  id: number;
  image: string;
  title: string;
  description?: string;
  buttonText?: string;
  imagePosition?: 'right' | 'left';
  type?: 'grid';
  images?: string[];
  hasEmailInput?: boolean;
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
    image: '/statefarm.jpg',
    title: 'Marketing your sporting events with Mustard Seed',
    buttonText: 'Learn More',
  },
  {
    id: 3,
    image: '/brandstuff.jpg',
    title: 'Build your brand',
    description:
      "Amplify your brand's impact with our professional Brand Ambassador services. Let us bring your brand to life and create meaningful customer experiences.",
    buttonText: 'Start Now',
  },
  {
    id: 4,
    image: '/brandstuff.jpg',
    title: 'Build your brand',
    description:
      "Amplify your brand's impact with our professional Brand Ambassador services. Let us bring your brand to life and create meaningful customer experiences.",
    buttonText: 'Start Now',
  },
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const prevSlideRef = useRef<HTMLDivElement>(null);
  const nextSlideRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

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
          <div ref={sliderRef} className="flex transition-transform duration-700 ease-in-out">
            {slides.map((slide, index) => (
              <div key={slide.id} className="min-w-full relative h-[500px] md:h-[600px]">
                {/* Desktop Background and Image */}
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
                        slide.imagePosition === 'right' ? 'justify-end pr-12' : ''
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
                                  'linear-gradient(to top, rgb(0, 0, 0) 10%, rgba(0, 0, 0, 0.8) 50%, transparent 100%)',
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

                {/* Mobile Background */}
                <div className="absolute inset-0 bg-[#0a0a0a] md:hidden" />

                {/* Slide Content */}
                <div className="relative h-full px-6 md:px-12">
                  <div
                    className={`h-full flex flex-col justify-start pt-16 slide-content ${
                      slide.imagePosition === 'right' ? 'md:w-2/3' : 'w-full'
                    } relative`} // Added 'relative' for positioning
                    ref={index === currentSlide ? nextSlideRef : prevSlideRef}
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
                        // For the first slide, position the button at bottom-right on mobile
                        <div className="absolute bottom-4 right-4 md:static">
                          <a
                            href="/show"
                            className="slide-button bg-[#8a2be2] text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold w-fit hover:bg-[#7424c9] transition-colors inline-block"
                          >
                            {slide.buttonText}
                          </a>
                        </div>
                      ) : (
                        // For other slides, render the button normally
                        <button className="slide-button bg-[#8a2be2] text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold w-fit hover:bg-[#7424c9] transition-colors">
                          {slide.buttonText}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between items-center px-4 md:px-0">
          <div className="flex gap-2 mb-4 md:mb-0">
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

          <div className="flex gap-4">
            <button
              onClick={prevSlideHandler}
              className="transition-colors text-gray-400 hover:text-[#8a2be2] md:block hidden"
              aria-label="Previous Slide"
            >
              <ChevronLeftCircle size={38} />
            </button>
            <button
              onClick={nextSlideHandler}
              className="transition-colors text-gray-400 hover:text-[#8a2be2] md:block hidden"
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
