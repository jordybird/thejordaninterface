// src/app/show/page.tsx

import Header from '@/components/show/header';
import ShowHero from '@/components/show/show-hero';
import Topics from '@/components/show/explore-topics';
import LatestEpisodes from '@/components/show/LastestEpisodes'; // Import the LatestEpisodes component
import Footer from '@/components/Footer';

export default function ShowPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ShowHero />
        <Topics />
        <LatestEpisodes /> {/* Add the LatestEpisodes component here */}
      </main>
      <Footer />
    </div>
  );
}
