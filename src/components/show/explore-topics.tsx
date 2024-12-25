"use client";

import { useState } from 'react';
import { Code, Wrench, Brain, Rocket, Building, Book, Clock, Star } from 'lucide-react';

interface TopicItem {
  icon: React.ReactNode;
  title: string;
  categories: string[];
}

const ExploreTopics = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality can be handled here without navigation
    console.log(`Search query: ${searchQuery}`);
  };

  const topics: TopicItem[] = [
    { 
      icon: <Brain className="w-8 h-8" />, 
      title: 'AI & Future Tech', 
      categories: ['Technology']
    },
    { 
      icon: <Rocket className="w-8 h-8" />, 
      title: 'Startup Journey', 
      categories: ['Entrepreneurship']
    },
    { 
      icon: <Building className="w-8 h-8" />, 
      title: 'Operations', 
      categories: ['Entrepreneurship']
    },
    { 
      icon: <Book className="w-8 h-8" />, 
      title: 'Health', 
      categories: ['Lifestyle']
    },
    { 
      icon: <Clock className="w-8 h-8" />, 
      title: 'Time', 
      categories: ['Lifestyle']
    },
    { 
      icon: <Code className="w-8 h-8" />, 
      title: 'Software & Coding', 
      categories: ['Technology']
    },
    { 
      icon: <Wrench className="w-8 h-8" />, 
      title: 'Tech Tools', 
      categories: ['Technology']
    },
    { 
      icon: <Star className="w-8 h-8" />, 
      title: 'Development', 
      categories: ['Lifestyle']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-[#28282B]">Looking for something specific?</h2>
        <p className="text-lg text-[#28282B] mb-8">Search the entire content library.</p>
        
        {/* Search Input */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8a2be2] focus:border-transparent text-[#28282B]"
          />
          <span className="absolute right-4 top-3 text-sm text-gray-500">
            return
          </span>
        </form>
      </div>

      {/* Topics Grid - Updated with 2x2 grid on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {topics.map((topic, index) => (
          <div 
            key={index}
            className="bg-gray-100 py-8 md:py-12 px-4 md:px-8 flex flex-col items-center text-center transition-colors"
          >
            <div className="mb-4 text-[#28282B]">
              {topic.icon}
            </div>
            <h3 className="text-sm md:text-lg font-medium text-[#28282B]">{topic.title}</h3>
          </div>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="text-center mt-12">
        <button 
          // Removed onClick handler to eliminate navigation
          className="slide-button bg-[#8a2be2] text-white px-8 py-3 font-bold rounded-full hover:bg-opacity-90 transition-colors cursor-default"
          disabled
        >
          Explore 20+ Topics
        </button>
      </div>
    </div>
  );
};

export default ExploreTopics;
