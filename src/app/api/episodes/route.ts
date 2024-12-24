// app/api/episodes/route.ts
import { NextResponse } from 'next/server';
import { fetchYoutubeEpisodes } from '../../lib/youtube';
import { enrichmentData } from '../../data/enrichment';

interface Episode {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  thumbnail: string;
  youtubeId: string;
  videoUrl: string; // Added videoUrl field
  type?: 'Guest Episode' | 'Essentials';
  categories?: string[];
  // optional enrichment fields
  articles?: Array<{
    title: string;
    journal?: string;
    url: string;
  }>;
  books?: Array<{
    title: string;
    author?: string;
    url: string;
  }>;
  otherResources?: Array<{
    title: string;
    source?: string;
    url: string;
  }>;
  // etc...
}

export async function GET() {
  try {
    // 1) Fetch from YouTube
    const youtubeData = await fetchYoutubeEpisodes();

    // 2) Transform the raw YouTube data into your Episode interface
    const episodes: Episode[] = youtubeData.map((item) => {
      const { videoId } = item.id;
      const { title, description, publishedAt, thumbnails } = item.snippet;

      return {
        id: videoId,                       // Use videoId as unique ID
        youtubeId: videoId,                // For embedding if needed
        videoUrl: `https://www.youtube.com/embed/${videoId}`, // Constructed embed URL
        title: title,
        description: description,
        publishDate: new Date(publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        thumbnail: thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url || '',
        // You can store "Guest Episode"/"Essentials" logic, or default to something
        type: 'Guest Episode', // default or custom logic
        categories: [],        // or fill in some logic
      };
    });

    // 3) Merge with enrichment data by matching youtubeId
    const enrichedEpisodes = episodes.map((ep) => {
      const match = enrichmentData.find((enr) => enr.youtubeId === ep.youtubeId);
      return {
        ...ep,
        ...match, // This will merge in articles, books, etc. if present
      };
    });

    return NextResponse.json(enrichedEpisodes);
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return NextResponse.json({ error: 'Failed to fetch episodes' }, { status: 500 });
  }
}
