// app/data/enrichment.ts
interface EpisodeEnrichment {
    youtubeId: string;  // This corresponds to the YouTube videoId
    articles?: Array<{
      title: string;
      journal: string;
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
    // Add other supplementary fields here...
  }
  
  export const enrichmentData: EpisodeEnrichment[] = [
    {
      youtubeId: 'XYZ123abc', // put the real videoId from YouTube
      articles: [
        {
          title: 'High income improves evaluation of life but not emotional well-being',
          journal: 'PNAS',
          url: '#',
        },
        // ...
      ],
      books: [
        {
          title: "Sorry I'm Late, I Didn’t Want to Come",
          url: '#',
        },
        // ...
      ],
      // ...
    },
    // Repeat for other episodes
  ];
  