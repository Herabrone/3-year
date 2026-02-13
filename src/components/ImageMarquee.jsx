import { useMemo } from 'react';
import './ImageMarquee.css';

const ImageMarquee = ({ images, position = 'top' }) => {
  // Create a randomized, repeated array of images
  const marqueeImages = useMemo(() => {
    if (!images || images.length === 0) return [];
    
    const repeatedImages = [];
    // Create 20 random selections from the provided images
    for (let i = 0; i < 20; i++) {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      repeatedImages.push({ src: randomImage, id: `${randomImage}-${i}` });
    }
    return repeatedImages;
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`image-marquee image-marquee--${position}`}>
      <div className="marquee-track">
        {marqueeImages.map((image, index) => (
          <div key={image.id} className="marquee-image">
            <img src={image.src} alt="" />
          </div>
        ))}
      </div>
      {/* Duplicate for seamless loop */}
      <div className="marquee-track marquee-track--duplicate">
        {marqueeImages.map((image, index) => (
          <div key={`dup-${image.id}`} className="marquee-image">
            <img src={image.src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageMarquee;