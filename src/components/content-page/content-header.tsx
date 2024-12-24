"use client";

import React from 'react';
import { Square, Check } from 'lucide-react';

interface ContentHeaderProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ContentHeader({ 
  selectedCategories, 
  setSelectedCategories 
}: ContentHeaderProps) {
  const categories = [
    'Solo Episode', 
    'Guest Episode', 
    'Documents', 
    'Technology', 
    'Entrepreneurship', 
    'Lifestyle'
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories: string[]) => 
      prevCategories.includes(category)
        ? prevCategories.filter((cat: string) => cat !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <div className="">
      <h1 className="text-6xl font-bold text-black mb-8">
        The Jordan Interface<br />
        Library
      </h1>
      
      <div className="flex flex-wrap gap-4 mt-8">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`
                flex items-center gap-2 px-4 py-2 
                rounded-full font-bold transition-all
                ${isSelected 
                  ? 'bg-purple-600 text-white hover:bg-purple-600' 
                  : 'bg-gray-100 text-black hover:bg-gray-200'}
              `}
            >
              {isSelected ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Square className="w-4 h-4 border-current" />
              )}
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}