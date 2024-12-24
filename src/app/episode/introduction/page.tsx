// src/app/episode/introduction/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { slugifyTitle } from '../../../../utils/slug';

// ---- INTERFACES ----
interface Article {
  title: string;
  journal?: string;
  url: string;
}

interface Book {
  title: string;
  author?: string;
  url: string;
}

interface Resource {
  title: string;
  source?: string;
  url: string;
}

interface HubermanLabEpisode {
  title: string;
  url: string;
}

interface PersonMentioned {
  name: string;
  title?: string;
  affiliation?: string;
  url?: string;
}

interface Episode {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  thumbnail: string;
  youtubeId: string;
  type?: 'Guest Episode' | 'Essentials';
  categories?: string[];
  articles?: Article[];
  books?: Book[];
  otherResources?: Resource[];
  hubermanLabEpisodes?: HubermanLabEpisode[];
  peopleMentioned?: PersonMentioned[];
}

// ---- VIDEO PLAYER COMPONENT ----
function VideoPlayer({ youtubeId, title }: { youtubeId: string; title: string }) {
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;

  return (
    <div className="relative w-full aspect-video mb-8">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
      />
    </div>
  );
}

// ---- SHOW NOTES COMPONENT ----
function ShowNotes({ episode }: { episode: Episode }) {
  return (
    <div className="space-y-8">
      {/* Episode Description */}
      <div className="prose max-w-none">
        <p className="text-base sm:text-lg leading-relaxed">{episode.description}</p>
      </div>

      {/* Articles Section */}
      {episode.articles && episode.articles.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Articles</h2>
          <ul className="space-y-3">
            {episode.articles.map((article, index) => (
              <li key={index}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#28282B] decoration-[#8a2be2] underline underline-offset-4 decoration-2 hover:opacity-80"
                >
                  <span className="font-medium text-base sm:text-lg">{article.title}</span>
                </a>
                {article.journal && (
                  <span className="text-gray-600 block text-sm sm:text-md mt-1">
                    ({article.journal})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Books Section */}
      {episode.books && episode.books.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Books</h2>
          <ul className="space-y-3">
            {episode.books.map((book, index) => (
              <li key={index}>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#28282B] decoration-[#8a2be2] underline underline-offset-4 decoration-2 hover:opacity-80"
                >
                  <span className="font-medium text-base sm:text-lg">{book.title}</span>
                </a>
                {book.author && (
                  <span className="text-gray-600 block text-sm sm:text-md mt-1">
                    by {book.author}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Other Resources Section */}
      {episode.otherResources && episode.otherResources.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Other Resources</h2>
          <ul className="space-y-3">
            {episode.otherResources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#28282B] decoration-[#8a2be2] underline underline-offset-4 decoration-2 hover:opacity-80"
                >
                  <span className="font-medium text-base sm:text-lg">{resource.title}</span>
                </a>
                {resource.source && (
                  <span className="text-gray-600 block text-sm sm:text-md mt-1">
                    ({resource.source})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Jordan Interface Episodes */}
      {episode.hubermanLabEpisodes && episode.hubermanLabEpisodes.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Related Jordan Interface Episodes</h2>
          <ul className="space-y-3">
            {episode.hubermanLabEpisodes.map((ep, index) => (
              <li key={index}>
                <a
                  href={ep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-base sm:text-lg text-[#28282B] decoration-[#8a2be2] underline underline-offset-4 decoration-2 hover:opacity-80"
                >
                  {ep.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* People Mentioned Section */}
      {episode.peopleMentioned && episode.peopleMentioned.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">People Mentioned</h2>
          <ul className="space-y-3">
            {episode.peopleMentioned.map((person, index) => (
              <li key={index}>
                {person.url ? (
                  <a
                    href={person.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[#28282B] decoration-[#8a2be2] underline underline-offset-4 decoration-2 hover:opacity-80"
                  >
                    <span className="font-medium text-base sm:text-lg">{person.name}</span>
                  </a>
                ) : (
                  <span className="font-medium text-[#28282B] text-base sm:text-lg">
                    {person.name}
                  </span>
                )}
                {(person.title || person.affiliation) && (
                  <span className="text-gray-600 block text-sm sm:text-md mt-1">
                    {person.title}
                    {person.title && person.affiliation && ', '}
                    {person.affiliation}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ---- MAIN EPISODE PAGE (SERVER COMPONENT) ----
export default function IntroductionEpisodePage() {
  // Define the static episode data
  const episode: Episode = {
    id: 'introduction',
    title: 'Introduction to The Jordan Interface Podcast',
    description:
      'Welcome to The Jordan Interface Podcast! In this introductory episode, Jordan Interface sets the stage for what listeners can expect from future episodes, discussing the intersection of technology, entrepreneurship, and personal development.',
    publishDate: '2024-04-01',
    thumbnail: '/images/introduction-thumbnail.jpg', // Ensure this image exists in public/images/
    youtubeId: '0dnZw7r2DZ4', // Your provided YouTube ID
    type: 'Essentials',
    categories: ['Technology', 'Entrepreneurship'],
    articles: [
      {
        title: 'Understanding the Tech Landscape in 2024',
        journal: 'Tech Today',
        url: 'https://techtoday.com/articles/understanding-tech-2024',
      },
    ],
    books: [
      {
        title: 'The Lean Startup',
        author: 'Eric Ries',
        url: 'https://example.com/the-lean-startup',
      },
    ],
    otherResources: [
      {
        title: 'Entrepreneurship 101',
        source: 'Startup Hub',
        url: 'https://startuphub.com/entrepreneurship-101',
      },
    ],
    hubermanLabEpisodes: [
      {
        title: 'Neuroscience and Business',
        url: 'https://youtube.com/watch?v=huberman1',
      },
    ],
    peopleMentioned: [
      {
        name: 'Eric Ries',
        title: 'Author',
        affiliation: 'Startup Advisor',
        url: 'https://ericries.com',
      },
      {
        name: 'Jane Doe',
        title: 'Tech Entrepreneur',
        affiliation: 'InnovateX',
      },
    ],
  };

  // Generate slug from title
  const slug = slugifyTitle(episode.title);

  return (
    <>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 text-[#28282B]">
        <div className="mt-16 sm:mt-24 mb-16">
          {/* Episode type & date */}
          <div className="mb-4 flex items-center flex-wrap gap-2">
            {episode.type && (
              <span className="text-green-600 font-medium">{episode.type}</span>
            )}
            {episode.type && <span className="text-[#28282B]">·</span>}
            <span className="text-[#28282B]">{episode.publishDate}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black">
            {episode.title}
          </h1>

          {/* Categories */}
          {episode.categories && episode.categories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {episode.categories.map((category) => (
                <span
                  key={category}
                  className="text-[#28282B] bg-gray-100 px-2 py-1 rounded"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Video Player */}
          {episode.youtubeId && (
            <VideoPlayer youtubeId={episode.youtubeId} title={episode.title} />
          )}

          {/* Show Notes */}
          <ShowNotes episode={episode} />
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="w-full bg-[#8a2be2] text-white min-h-[520px] flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-3xl md:text-[40px] mt-6 leading-tight font-medium mb-6">
            Stay in the loop with updates from The Jordan Interface Podcast.
          </h2>
          <p className="text-base sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-normal">
            Get insights on technology, entrepreneurship, and life delivered straight to your inbox.
            Be the first to know about new episodes, guest appearances, and exclusive content.
          </p>

          {/* Desktop version */}
          <div className="hidden sm:block max-w-2xl mx-auto mb-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-6 py-4 pr-36 rounded-full text-[#28282B] text-lg focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00b8ff] text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-[#0099ff] transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Mobile version */}
          <div className="sm:hidden space-y-3 max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-3 rounded-full text-[#28282B] text-base focus:outline-none"
            />
            <button className="w-full bg-[#00b8ff] text-white px-6 py-3 rounded-full font-medium text-base hover:bg-[#0099ff] transition-colors">
              Subscribe
            </button>
          </div>

          <p className="text-sm sm:text-base">
            By subscribing, you agree to our{' '}
            <a href="#" className="underline hover:text-gray-200">
              Privacy Policy
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
