"use client";

import React, { useState } from 'react';
import Header from '@/components/content-page/header';
import ContentHeader from '@/components/content-page/content-header';
import PopularTopics from '@/components/content-page/popular-topics';

export interface ContentPageProps {
  // You can add props here if needed in the future
}

export default function ContentPage({}: ContentPageProps) {
  // State for category filtering
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Header Section with Filters */}
        <div className="bg-[#f9f9f9] pb-2">
          <div className="max-w-7xl mx-auto px-4 pt-32">
            <ContentHeader 
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white">
          {/* Popular Topics Section */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            <PopularTopics selectedCategories={selectedCategories} />
          </div>
          
          {/* You can add more sections here as needed */}
          {/* Example:
          <div className="max-w-7xl mx-auto px-4 py-12">
            <RecentEpisodes selectedCategories={selectedCategories} />
          </div>
          <div className="max-w-7xl mx-auto px-4 py-12">
            <DocumentLibrary selectedCategories={selectedCategories} />
          </div>
          */}
        </div>

        {/* Footer or Additional Content */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* You can add a footer or additional sections here */}
          </div>
        </div>
      </div>
    </>
  );
}