// src/app/blog/[slug]/page.jsx
import Header from '@/components/header';
import BlogHeader from '@/components/blog-page/unique-blog-post/BlogHeader';
import SignUpForNewsletter from '@/components/blog-page/SignUpForNewsletter';
import Footer from '@/components/Footer';
import { blog } from '@/app/data/blog/blog';
import BlogPageClient from '@/components/blog-page/BlogPageClient'; // Import the Client Component

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function BlogPage({ params }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Main Content with Margins */}
        <div className="mx-8 pt-32">
          <div className="max-w-3xl">
            <BlogHeader 
              title={blog.title}
              date={formatDate(blog.date)}
            />
          </div>

          {/* Embed the Client Component */}
          <BlogPageClient />
        </div>

        {/* Newsletter Section - Not inside mx-8 */}
        <div className="w-full bg-[#00bfff] py-12">
          <div className="max-w-7xl mx-auto px-8">
            <SignUpForNewsletter />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
