import React from 'react';
import { useRouter } from 'next/navigation';

const AboutMe = () => {
  const router = useRouter();

  const handleNavigateToAbout = () => {
    router.push('/about');
  };

  return (
    <section className="bg-gradient-to-r from-[#0A0A0A] to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-0 md:py-8">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          {/* Text Content */}
          <div className="w-full md:w-2/3 mt-8 md:mt-0">
            <h1 className="text-3xl md:text-5xl font-bold text-white md:-mt-12">
              <span className="block mb-2">About</span>
              <span className="block">Jordan Cox</span>
            </h1>
            
            <p className="text-base md:text-lg text-white/90 mt-2 md:mt-3">
              Self-taught software engineer Jordan Cox is the CEO of Hover, 
              an online management system revolutionizing private jet charter 
              agency operations.
            </p>
            
            <button 
              onClick={handleNavigateToAbout}
              className="slide-buttonn bg-sky-500 mt-6 md:mt-12 text-white px-6 py-3 md:py-3.5 rounded-full text-base font-semibold"
            >
              Learn more about Jordan Cox
            </button>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/3 relative overflow-visible h-64 md:h-96 mt-6 md:mt-0">
  <img
    src="/imageofme.png"
    alt="Jordan Cox"
    className="w-auto h-full md:h-[150%] ml-12 object-cover md:-mt-20"
  />
</div>
        </div>
      </div>

      {/* Inline Styles for Button Animation */}
      <style jsx>{`
        .slide-buttonn {
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .slide-buttonn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #8a2be2;
          transition: left 0.7s ease;
          z-index: -1;
        }

        .slide-buttonn:hover::before {
          left: 0;
        }
      `}</style>
    </section>
  );
};

export default AboutMe;