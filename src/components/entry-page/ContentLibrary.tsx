import React, { useState } from 'react';
import { 
  Code, Wrench, Brain, Shield, Rocket, 
  Building, TrendingUp, Wallet, Heart, Star, 
  Book, Clock 
} from 'lucide-react';

const ContentLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    {
      id: 'technology',
      items: [
        { icon: <Code size={24} />, title: 'Software & Coding', description: 'Tutorials, code reviews, and best practices' },
        { icon: <Wrench size={24} />, title: 'Tech Tools', description: 'Digital tools and automation' },
        { icon: <Brain size={24} />, title: 'AI & Future Tech', description: 'AI and emerging technologies' },
        { icon: <Shield size={24} />, title: 'Digital Security', description: 'Cybersecurity and privacy' }
      ]
    },
    {
      id: 'entrepreneurship',
      items: [
        { icon: <Rocket size={24} />, title: 'Startup Journey', description: 'Founder experiences and lessons' },
        { icon: <Building size={24} />, title: 'Operations', description: 'Systems and processes' },
        { icon: <TrendingUp size={24} />, title: 'Growth', description: 'Marketing and scaling strategies' },
        { icon: <Wallet size={24} />, title: 'Finance', description: 'Funding and revenue planning' }
      ]
    },
    {
      id: 'lifestyle',
      items: [
        { icon: <Heart size={24} />, title: 'Work-Life', description: 'Balance and boundaries' },
        { icon: <Star size={24} />, title: 'Development', description: 'Self-improvement and growth' },
        { icon: <Book size={24} />, title: 'Health', description: 'Physical and mental well-being' },
        { icon: <Clock size={24} />, title: 'Time', description: 'Productivity and scheduling' }
      ]
    }
  ];

  const allItems = categories.flatMap(category => category.items);
  const displayedItems = activeCategory === 'all' 
    ? allItems 
    : categories.find(cat => cat.id === activeCategory)?.items || [];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 text-[#28282B]">Resource Library</h2>
          <p className="text-lg text-[#28282B]/70">
            Explore content across technology, business, and lifestyle
          </p>
        </div>

        {/* Category Filter Scrollable Container */}
        <div className="overflow-x-auto mb-8 -mx-4 px-4">
          <div className="flex justify-start md:justify-center gap-2 min-w-max">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeCategory === 'all' 
                  ? 'bg-[#8a2be2] text-white' 
                  : 'bg-gray-100 text-[#28282B] hover:bg-gray-200'}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                  ${activeCategory === category.id 
                    ? 'bg-[#8a2be2] text-white' 
                    : 'bg-gray-100 text-[#28282B] hover:bg-gray-200'}`}
              >
                {category.id.charAt(0).toUpperCase() + category.id.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {displayedItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-4 md:p-6 rounded-lg border border-gray-100 
                       hover:shadow-md transition-shadow"
            >
              <div className="text-[#8a2be2] mb-3">
                {item.icon}
              </div>
              <h4 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 text-[#28282B]">
                {item.title}
              </h4>
              <p className="text-[#28282B]/70 text-xs md:text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentLibrary;