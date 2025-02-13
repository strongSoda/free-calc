import React, { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowLeft, ChevronRight } from 'lucide-react';
import BlogFeaturedImage from './BlogFeaturedImage';

// Helper function to generate a TOC item ID
const generateId = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const BlogLayout = ({ 
  title,
  subtitle,
  date,
  readingTime,
  relatedPosts = [],
  relatedCalculators = [],
  author = {
    name: "Free Calculators",
    url: "https://rref-calculator.com"
  },  
  children,
  featuredImage
}) => {
  const [activeSection, setActiveSection] = useState("");
  const [toc, setToc] = useState([]);
  
  // Find all section headings and their IDs
  useEffect(() => {
    const article = document.querySelector('article');
    console.log(article);
    if (!article) return;

    

    const headings = article.querySelectorAll('h2[id], h3[id]');
    const tocItems = Array.from(headings).map(heading => ({
      id: heading.id,
      text: heading.textContent,
      level: parseInt(heading.tagName.charAt(1))
    }));

    setToc(tocItems);
  }, []);

  // Handle section visibility and URL updates
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            if (entry.target.id) {
              window.history.pushState(null, '', `#${entry.target.id}`);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('h2[id], h3[id]').forEach((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  // Handle initial hash navigation
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
          }, 100);
        }
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  // Schema.org JSON-LD
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": subtitle,
      "author": {
        "@type": "Person",
        "name": author.name,
        "url": author.url
      },
      "datePublished": date,
      "image": "https://rref-calculator.com/og-image.png",
      "publisher": {
        "@type": "Organization",
        "name": "Free Calculators",
        "logo": {
          "@type": "ImageObject",
          "url": "https://rref-calculator.com/logo.png"
        }
      }
    });
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, [title, subtitle, date, author]);

  return (
    <div className="relative max-w-none">
      {/* Back to Calculators */}
      <a 
        href="/calculators" 
        className="inline-flex items-center text-accent-primary hover:text-accent-primary/80 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Calculators
      </a>

      {/* Header */}
      <header className="mb-12">        
        {/* <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-content-light-dimmed dark:text-content-dark-dimmed mb-6">
            {subtitle}
          </p>
        )} */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {readingTime} min read
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Main Content */}
        <article className="prose dark:prose-invert max-w-none">
          {children}
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Table of Contents */}
          <div className="sticky top-24 space-y-4 p-6 bg-surface-light-hover dark:bg-surface-dark rounded-xl border border-gray-200/10 dark:border-gray-800/10">
            <h2 className="font-display text-lg font-semibold">Table of Contents</h2>
            <nav className="space-y-2">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block text-sm ${
                    item.level === 3 ? 'ml-4' : ''
                  } ${
                    activeSection === item.id
                      ? 'text-accent-primary font-medium'
                      : 'text-content-light-dimmed dark:text-content-dark-dimmed hover:text-accent-primary'
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {/* Related Content */}
      <div className="my-16 grid md:grid-cols-2 gap-8">
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold">Related Articles</h2>
            <div className="space-y-4">
              {relatedPosts.map((post) => (
                <a
                  key={post.url}
                  href={post.url}
                  className="block p-4 bg-surface-light-hover dark:bg-surface-dark rounded-xl border border-gray-200/10 dark:border-gray-800/10 hover:border-accent-primary/20 transition-colors"
                >
                  <h3 className="font-display font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                    {post.excerpt}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Related Calculators */}
        {relatedCalculators.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold">Related Calculators</h2>
            <div className="space-y-4">
              {relatedCalculators.map((calc) => (
                <a
                  key={calc.url}
                  href={calc.url}
                  className="flex items-center justify-between p-4 bg-surface-light-hover dark:bg-surface-dark rounded-xl border border-gray-200/10 dark:border-gray-800/10 hover:border-accent-primary/20 transition-colors group"
                >
                  <h3 className="font-display font-semibold">{calc.title}</h3>
                  <ChevronRight className="w-5 h-5 text-accent-primary transform group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {featuredImage && (
          <BlogFeaturedImage image={featuredImage} />
        )}
    </div>
  );
};

export default BlogLayout;