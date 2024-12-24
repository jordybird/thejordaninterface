'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Episode {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  thumbnail: string;
  tags?: string[];
}

export default function LatestEpisodes() {
  const episode: Episode = {
    id: 'introduction',
    title: 'Introduction to The Jordan Interface Podcast',
    description:
      'Welcome to The Jordan Interface Podcast! In this introductory episode, Jordan Interface sets the stage for what listeners can expect from future episodes, discussing the intersection of technology, entrepreneurship, and personal development.',
    publishDate: '2024-04-01',
    thumbnail: '/thumb.png',
    tags: ['Emotions & Relationships'],
  };

  const slug = 'introduction';

  return (
    <section className="max-w-7xl mx-auto py-8 px-4 bg-white">
      <h2 className="text-4xl text-[#28282B] font-bold mb-8">Latest Episodes</h2>

      <div className="mb-16">
        <Link href={`/episode/${slug}`}>
          <article className="flex flex-col md:flex-row gap-8 group">
            {/* Left side: Image */}
            <div className="w-full md:w-3/5 relative aspect-[16/9]">
              <Image
                src={episode.thumbnail}
                alt={episode.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                priority
              />
            </div>

            {/* Right side: Content */}
            <div className="w-full md:w-2/5 flex flex-col pt-0">
              {/* Title */}
              <h3 className="text-4xl font-bold mb-4 leading-tight text-[#28282B] group-hover:text-[#8a2be2] transition-colors duration-300">
                {episode.title}
              </h3>

              {/* Description */}
              <p className="text-xl text-[#28282B] mb-4 leading-relaxed">
                {episode.description.length > 200
                  ? `${episode.description.slice(0, 200)}...`
                  : episode.description}
              </p>

              {/* Tags */}
              {episode.tags && episode.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {episode.tags.map((tag, index) => (
                    <span
                      key={`${episode.id}-tag-${index}`}
                      className="text-[#28282B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        </Link>
      </div>

      {/* Discover More Episodes Button */}
      <div className="flex justify-center">
        <Link href="/show">
          <button className=" slide-button bg-[#8a2be2] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all duration-300">
            Discover more episodes
          </button>
        </Link>
      </div>
    </section>
  );
}