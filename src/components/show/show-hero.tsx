import Image from 'next/image';

const ShowHero = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid layout: single column on mobile, two columns on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 items-start md:mt-12">
          
          {/* Left side - Image */}
          <div className="relative aspect-square max-w-sm mx-auto md:mx-0 mt-16 md:mt-0 order-1 md:order-1">
            <Image
              src="/me.png"
              alt="The Jordan Interface Host"
              width={320}  
              height={320} 
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Right side - Content */}
          <div className="space-y-6  md:-ml-20 order-2 md:order-2">
            <h1 className="text-4xl mt-20 md:mt-0 md:text-5xl font-bold text-gray-900 whitespace-nowrap">
              The Jordan Interface
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join me for insightful 15-minute talks exploring the intersection of technology, entrepreneurship, and the complexities of modern life. Each bi-weekly episode delivers concise, actionable insights to help you navigate today's rapidly evolving digital landscape.
            </p>

            {/* Platform Links */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold text-gray-900">
    Listen on your favorite platform
  </h3>
  <div className="flex flex-wrap gap-4">
    <a href="#" className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
      <Image
        src="/icons/youtube.svg"
        alt="YouTube"
        width={24}
        height={24}
      />
      <span className="text-gray-700 hover:text-[#8a2be2] font-bold transition-colors">YouTube</span>
    </a>
    <a href="#" className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
      <Image
        src="/icons/apple-podcast.svg"
        alt="Apple Podcasts"
        width={24}
        height={24}
      />
      <span className="text-gray-700 font-bold hover:text-[#8a2be2] transition-colors">Apple Podcasts</span>
    </a>
    <a href="#" className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
      <Image
        src="/icons/spotify.svg"
        alt="Spotify"
        width={24}
        height={24}
      />
      <span className="text-gray-700 font-bold hover:text-[#8a2be2] transition-colors">Spotify</span>
    </a>
  </div>
</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShowHero;
