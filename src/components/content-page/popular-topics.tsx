import React from 'react';
import { 
  Code, Wrench, Brain, Shield, Rocket, 
  Building, TrendingUp, Wallet, Heart, Star, 
  Book, Clock 
} from 'lucide-react';

interface TopicItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  categories: string[];
}

interface CategoryGroup {
  id: string;
  items: TopicItem[];
}

interface PopularTopicsProps {
  selectedCategories: string[];
}

export default function PopularTopics({ selectedCategories }: PopularTopicsProps) {
  const categories: CategoryGroup[] = [
    {
      id: 'technology',
      items: [
        { 
          icon: <Code className="w-8 h-8" />, 
          title: 'Software & Coding', 
          description: 'Tutorials, code reviews, and best practices',
          categories: ['Technology']
        },
        { 
          icon: <Wrench className="w-8 h-8" />, 
          title: 'Tech Tools', 
          description: 'Digital tools and automation',
          categories: ['Technology']
        },
        { 
          icon: <Brain className="w-8 h-8" />, 
          title: 'AI & Future Tech', 
          description: 'AI and emerging technologies',
          categories: ['Technology']
        },
        { 
          icon: <Shield className="w-8 h-8" />, 
          title: 'Digital Security', 
          description: 'Cybersecurity and privacy',
          categories: ['Technology']
        }
      ]
    },
    {
      id: 'entrepreneurship',
      items: [
        { 
          icon: <Rocket className="w-8 h-8" />, 
          title: 'Startup Journey', 
          description: 'Founder experiences and lessons',
          categories: ['Entrepreneurship']
        },
        { 
          icon: <Building className="w-8 h-8" />, 
          title: 'Operations', 
          description: 'Systems and processes',
          categories: ['Entrepreneurship']
        },
        { 
          icon: <TrendingUp className="w-8 h-8" />, 
          title: 'Growth', 
          description: 'Marketing and scaling strategies',
          categories: ['Entrepreneurship']
        },
        { 
          icon: <Wallet className="w-8 h-8" />, 
          title: 'Finance', 
          description: 'Funding and revenue planning',
          categories: ['Entrepreneurship']
        }
      ]
    },
    {
      id: 'lifestyle',
      items: [
        { 
          icon: <Heart className="w-8 h-8" />, 
          title: 'Work-Life', 
          description: 'Balance and boundaries',
          categories: ['Lifestyle']
        },
        { 
          icon: <Star className="w-8 h-8" />, 
          title: 'Development', 
          description: 'Self-improvement and growth',
          categories: ['Lifestyle']
        },
        { 
          icon: <Book className="w-8 h-8" />, 
          title: 'Health', 
          description: 'Physical and mental well-being',
          categories: ['Lifestyle']
        },
        { 
          icon: <Clock className="w-8 h-8" />, 
          title: 'Time', 
          description: 'Productivity and scheduling',
          categories: ['Lifestyle']
        }
      ]
    }
  ];

  const allItems = categories.flatMap(category => category.items);

  const filteredItems = allItems.filter(item => {
    // If no categories are selected, show all items
    if (selectedCategories.length === 0) return true;

    // Don't show any items if Solo Episode or Guest Episode is selected
    if (selectedCategories.includes('Solo Episode') || 
        selectedCategories.includes('Guest Episode') || 
        selectedCategories.includes('Documents')) {
      return false;
    }

    // Check if the item matches any selected category
    return selectedCategories.some(selectedCategory => 
      item.categories.includes(selectedCategory)
    );
  });

  // Function to get the message for no content
  const getNoContentMessage = () => {
    if (selectedCategories.includes('Solo Episode')) {
      return 'No solo episodes available yet';
    }
    if (selectedCategories.includes('Guest Episode')) {
      return 'No guest episodes available yet';
    }
    if (selectedCategories.includes('Documents')) {
      return 'No documents available yet';
    }
    return 'No content available for the selected filters';
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-[#28282B] mb-4">Popular Topics</h2>
      <p className="text-lg text-[#28282B]/70 mb-8">
        Explore content across technology, business, and lifestyle
      </p>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-[#28282B]/70">{getNoContentMessage()}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="text-[#8a2be2] mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-[#28282B] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#28282B]/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}