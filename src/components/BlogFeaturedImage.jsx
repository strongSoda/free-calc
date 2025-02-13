import React from 'react';

const BlogFeaturedImage = ({ image }) => {
  if (!image) return null;

  const { url, alt, title, width, height } = image;

  return (
    <div className="relative w-full mb-8">
      {/* Featured Image Container */}
      <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-surface-light-hover dark:bg-surface-dark">
        <img
          src={url}
          alt={alt}
          title={title}
          width={width}
          height={height}
          loading="lazy"
          className="w-full h-full object-cover"
          importance="high"
        />
      </div>
      
      {/* Image Caption */}
      <figcaption className="mt-2 text-sm text-content-light-dimmed dark:text-content-dark-dimmed text-center">
        {alt}
      </figcaption>
    </div>
  );
};

export default BlogFeaturedImage;