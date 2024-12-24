// app/lib/youtube.ts
interface YouTubeApiItem {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        high?: { url: string };
        medium?: { url: string };
        default?: { url: string };
      };
      liveBroadcastContent: string; // Indicates if the video is live, upcoming, or none
    };
  }
  
  export async function fetchYoutubeEpisodes(): Promise<YouTubeApiItem[]> {
    const apiKey = process.env.YOUTUBE_API_KEY ?? '';
    const channelId = process.env.YOUTUBE_CHANNEL_ID ?? '';
  
    console.log('YouTube API Key:', apiKey);
    console.log('YouTube Channel ID:', channelId);
  
    if (!apiKey || !channelId) {
      console.error('Missing YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID in environment variables.');
      return [];
    }
  
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10&type=video`
      );
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error('YouTube API Error:', errorData);
        throw new Error(`Failed to fetch data from YouTube API. Status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log('YouTube API Response:', data);
  
      // Optionally, filter out live or upcoming premieres
      const filteredItems = data.items.filter(
        (item: YouTubeApiItem) => item.id.videoId && item.snippet.liveBroadcastContent !== 'upcoming'
      );
  
      return filteredItems;
    } catch (err) {
      console.error('fetchYoutubeEpisodes Error:', err);
      return [];
    }
  }
  