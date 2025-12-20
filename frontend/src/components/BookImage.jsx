import React, { useState, useEffect } from 'react';

const BookImage = ({ src, alt, className, title }) => {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Generate SVG placeholder with book title
  const generatePlaceholder = () => {
    const displayTitle = title || 'Book Cover';
    // Split title into words for better display
    const words = displayTitle.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      if ((currentLine + word).length <= 20) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);
    
    const textElements = lines.map((line, idx) => 
      `<text x="150" y="${180 + idx * 30}" font-family="Georgia, serif" font-size="18" font-weight="bold" text-anchor="middle" fill="#8b6f47">${line}</text>`
    ).join('');
    
    const svg = `<svg width="300" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="400" fill="#f5f1eb"/>${textElements}<text x="150" y="280" font-family="Georgia, serif" font-size="48" text-anchor="middle" fill="#8b6f47" opacity="0.5">📖</text></svg>`;
    
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  };

  const handleError = (e) => {
    // Try different extensions if current one fails
    if (currentSrc && !imageError && currentSrc.startsWith('/images/books/')) {
      const basePath = currentSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      const extensions = ['.png', '.jpg', '.jpeg', '.webp'];
      const currentExt = currentSrc.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '.jpg';
      const currentIndex = extensions.indexOf(currentExt);
      
      if (currentIndex < extensions.length - 1) {
        // Try next extension
        const nextSrc = basePath + extensions[currentIndex + 1];
        setCurrentSrc(nextSrc);
        e.target.src = nextSrc;
        return;
      }
    }
    
    if (!imageError) {
      setImageError(true);
      // Try to load placeholder immediately
      e.target.src = generatePlaceholder();
    }
  };

  // Reset error state if src changes
  useEffect(() => {
    if (src) {
      setImageError(false);
      setCurrentSrc(src);
    }
  }, [src]);

  const imageSrc = imageError || !currentSrc ? generatePlaceholder() : currentSrc;

  return (
    <img
      key={currentSrc} // Force re-render when src changes
      src={imageSrc}
      alt={alt || title}
      className={className}
      onError={handleError}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
};

export default BookImage;

