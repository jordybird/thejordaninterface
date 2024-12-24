import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ComingSoon = () => {
  const router = useRouter();

  const handleSpotifyClick = () => {
    // Placeholder navigation - update this with actual Spotify link later
    router.push('https://open.spotify.com/show/4IL0J6QOf0YvoED9a3AoSX?si=bXxPFPHVQgWGXrQ9frepeg');
  };

  const handleAppleClick = () => {
    // Placeholder navigation - update this with actual Apple Podcasts link later
    router.push('/apple-podcast-placeholder');
  };

  return (
    <section className="bg-[#00BFFF]">
      <div className="max-w-7xl mx-auto px-4 md:pl-8 md:pr-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left side - Image */}
          <div className="w-[95vw] md:w-1/2 -mx-4 md:mx-0">
            <div className="rounded-lg shadow-xl">
              <Image
                src="/podcast.jpg"
                alt="Podcast Preview"
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-1/2 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Podcast Coming Soon
            </h2>
            
            <p className="text-xl mb-6">
              Join me for insightful conversations about technology, 
              entrepreneurship, and everyday life. 
              Follow on your platform of choice!
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleSpotifyClick}
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full 
                         font-semibold text-lg cursor-pointer"
              >
                <Image 
                  src="/icons/spotify.svg"
                  alt="Spotify"
                  width={24}
                  height={24}
                  className="text-white"
                />
                Follow on Spotify
              </button>

              <button 
                onClick={handleAppleClick}
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full 
                         font-semibold text-lg cursor-pointer"
              >
                <Image 
                  src="/icons/apple-podcast.svg"
                  alt="Apple Podcasts"
                  width={24}
                  height={24}
                  className="text-white"
                />
                Listen on Apple
              </button>
            </div>

            {/* Additional Info */}
            <p className="mt-6 text-md opacity-90">
              Get ready for weekly episodes featuring thought provokers, 
              technical deep dives, and behind-the-scenes insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;