import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules';
import Section from './Section';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwipeContainer.css';

const SwipeContainer = ({ sections, onSectionChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.activeIndex);
    onSectionChange(swiper.activeIndex);
  };

  return (
    <Swiper
      direction="horizontal"
      slidesPerView={1}
      speed={800}
      mousewheel={true}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      navigation={true}
      modules={[Navigation, Pagination, Keyboard, Mousewheel]}
      onSlideChange={handleSlideChange}
      className="swipe-container"
    >
      {sections.map((section, index) => (
        <SwiperSlide key={section.id}>
          <Section
            title={section.title}
            stat={section.stat}
            statLabel={section.statLabel}
            description={section.description}
            backgroundColor={section.backgroundColor}
            imageUrl={section.imageUrl}
            images={section.images}
            tapToReveal={section.tapToReveal}
            mapData={section.mapData}
            sectionId={section.id}
            isActive={currentSlide === index}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwipeContainer;
