import { useState, useEffect } from 'react';
import ImageMarquee from './ImageMarquee';
import InteractiveMap from './InteractiveMap';
import MessageBackground from './MessageBackground';
import './Section.css';

const Section = ({ title, stat, statLabel, description, backgroundColor, imageUrl, images, tapToReveal, mapData, sectionId, isActive = false }) => {
  const [displayStat, setDisplayStat] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [revealedItems, setRevealedItems] = useState(new Set());
  const [showAllReveals, setShowAllReveals] = useState(false);
  const [locationsRevealed, setLocationsRevealed] = useState(0);

  const onLocationRevealed = (location, count) => {
    setLocationsRevealed(count);
    // You could also update the stat dynamically here if desired
  };

  // Check if this is the messages section
  const isMessagesSection = sectionId === 2 || title?.toLowerCase().includes('digital');

  useEffect(() => {
    // Only animate if there's a numeric stat and we haven't animated yet
    if (stat && typeof stat === 'number' && !hasAnimated) {
      setHasAnimated(true);
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat / steps;
      const stepTime = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setDisplayStat(stat);
          clearInterval(timer);
        } else {
          setDisplayStat(Math.floor(increment * currentStep));
        }
      }, stepTime);

      return () => clearInterval(timer);
    } else if (!stat) {
      // For non-numeric stats, show immediately
      setHasAnimated(true);
    }
  }, [stat, hasAnimated]);

  const handleRevealClick = (index) => {
    const newRevealed = new Set(revealedItems);
    newRevealed.add(index);
    setRevealedItems(newRevealed);
    
    // If all items are revealed, show the "show all" state
    if (newRevealed.size === tapToReveal?.length) {
      setTimeout(() => setShowAllReveals(true), 500);
    }
  };

  const sectionStyle = {
    backgroundColor: backgroundColor,
  };

  // Use images array if provided, otherwise fall back to single imageUrl
  const imagesToShow = images && images.length > 0 ? images : (imageUrl ? [imageUrl] : null);

  return (
    <div className="section" style={sectionStyle}>
      {/* Message background for messages section */}
      {isMessagesSection && <MessageBackground isVisible={isActive} />}
      
      {imagesToShow && (
        <>
          <ImageMarquee images={imagesToShow} position="top" />
          <ImageMarquee images={imagesToShow} position="bottom" />
        </>
      )}
      <div className="section-overlay" />
      <div className="section-content">
        <h2 className="section-title">{title}</h2>
        <div className="section-stat">
          {stat && typeof stat === 'number' ? (
            <span className="stat-number">{displayStat.toLocaleString()}</span>
          ) : null}
          <span className="stat-label">{statLabel}</span>
        </div>
        <p className="section-description">{description}</p>
        
        {/* Render map if mapData exists */}
        {mapData ? (
          <InteractiveMap 
            mapData={mapData} 
            onLocationRevealed={onLocationRevealed}
          />
        ) : null}
        
        {tapToReveal && tapToReveal.length > 0 && (
          <div className="tap-to-reveal-container">
            <div className={`reveal-grid ${showAllReveals ? 'show-all' : ''}`}>
              {tapToReveal.map((item, index) => (
                <div
                  key={index}
                  className={`reveal-item ${revealedItems.has(index) ? 'revealed' : 'hidden'}`}
                  onClick={() => !revealedItems.has(index) && handleRevealClick(index)}
                >
                  {revealedItems.has(index) ? (
                    <div className="reveal-content">
                      <div className="reveal-label">{item.label}</div>
                      <div className={`reveal-value ${item.type === 'number' ? 'number' : 'text'}`}>
                        {item.type === 'number' && typeof item.value === 'number' 
                          ? item.value.toLocaleString() 
                          : item.value}
                      </div>
                    </div>
                  ) : (
                    <div className="reveal-placeholder">
                      <span className="tap-hint">Tap to reveal</span>
                      <div className="reveal-icon">✨</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {!showAllReveals && revealedItems.size < tapToReveal.length && (
              <div className="reveal-progress">
                {revealedItems.size} of {tapToReveal.length} revealed
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
