import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Design {
  id: number;
  image: string;
  name: string;
}

interface DesignCarouselProps {
  designs: Design[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export const DesignCarousel: React.FC<DesignCarouselProps> = ({ designs, selectedIndex, onSelect }) => {
  return (
    <div className="w-full py-8">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="design-carousel"
        style={{ paddingBottom: '50px' }}
      >
        {designs.map((design, index) => (
          <SwiperSlide key={design.id} style={{ width: '280px' }}>
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(index)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                selectedIndex === index
                  ? 'ring-4 ring-primary shadow-2xl shadow-primary/30'
                  : 'ring-1 ring-border/50'
              }`}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-8xl">{design.image}</span>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-semibold text-foreground">{design.name}</p>
                <p className="text-sm text-muted-foreground">AI Generated</p>
              </div>

              {selectedIndex === index && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              )}

              {selectedIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <Sparkles className="absolute top-4 left-4 w-4 h-4 text-primary animate-pulse" />
                  <Sparkles className="absolute top-8 right-8 w-3 h-3 text-accent animate-pulse" />
                  <Sparkles className="absolute bottom-16 left-8 w-4 h-4 text-secondary animate-pulse" />
                </motion.div>
              )}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DesignCarousel;
