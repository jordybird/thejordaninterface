import React from 'react';
import { useRouter } from 'next/navigation';

// Add button animation styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
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
  `;
  document.head.appendChild(style);
}

const AboutMe = () => {
  const router = useRouter();

  const handleNavigateToAbout = () => {
    router.push('/about');
  };

  return (
    <section className="bg-gradient-to-r from-[#0A0A0A] to-neutral-800">
      <div className="max-w-7xl mx-auto pl-8 pr-4 py-3">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Text Content */}
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold -mt-12 text-white">
              <span className="block mb-2">About</span>
              <span className="block">Jordan Cox</span>
            </h1>
            
            <p className="text-lg text-white/90 mt-3">
              Self-taught software engineer Jordan Cox is the CEO of Hover, 
              an online management system revolutionizing private jet charter 
              agency operations.
            </p>
            
            <button 
              onClick={handleNavigateToAbout}
              className="slide-buttonn bg-sky-500 mt-12 text-white px-6 py-3.5 rounded-full text-base font-semibold mt-5"
            >
              Learn more about Jordan Cox
            </button>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/4">
            <img
              src="/jcox.png"
              alt="Jordan Cox"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;