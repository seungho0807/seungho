import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Clock, Coffee } from 'lucide-react';
import { HERO_SLIDES } from '../data/mockData';

interface HeroSliderProps {
  onOrderClick: () => void;
  onExploreMenu: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOrderClick, onExploreMenu }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden bg-neutral-900 text-white min-h-[520px] lg:min-h-[580px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#FDC913] blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-500 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text & Call to Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Season Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDC913]/20 border border-[#FDC913]/50 text-[#FDC913] text-xs font-black tracking-wider uppercase backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {slide.title}
              </h1>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FDC913] font-montserrat">
                {slide.highlight}
              </p>
            </div>

            {/* Description */}
            <p className="text-neutral-300 text-base sm:text-lg max-w-xl leading-relaxed">
              {slide.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {slide.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 text-neutral-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Price & Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOrderClick}
                className="bg-[#FDC913] hover:bg-yellow-400 text-neutral-950 font-black px-7 py-3.5 rounded-2xl shadow-lg shadow-amber-400/20 active:scale-95 transition-all flex items-center gap-2.5 text-base cursor-pointer"
              >
                <span>지금 바로 주문하기</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreMenu}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-2xl border border-white/20 transition-all flex items-center gap-2 text-base cursor-pointer"
              >
                <Coffee className="w-4 h-4 text-[#FDC913]" />
                <span>전 메뉴 둘러보기</span>
              </button>

              <div className="flex items-center gap-1.5 text-sm font-semibold text-neutral-400 pl-2">
                <Clock className="w-4 h-4 text-[#FDC913]" />
                <span>주문 즉시 5분 제조</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-400/30 to-yellow-200/10 blur-xl scale-95" />
              
              <div className="relative rounded-3xl bg-neutral-800/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-2xl overflow-hidden text-center group">
                
                {/* Floating Price Pill */}
                <div className="absolute top-4 right-4 bg-[#FDC913] text-neutral-950 font-black text-xs px-3 py-1.5 rounded-full shadow-md">
                  {slide.priceTag}
                </div>

                {/* Big Drink Visual Graphic with Official Product Image & Layering */}
                <div className="py-6 my-2 flex flex-col items-center justify-center relative">
                  <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-br from-yellow-400/20 to-amber-600/30 flex items-center justify-center border-4 border-[#FDC913]/30 shadow-inner group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                    {slide.imageUrl ? (
                      <img
                        src={slide.imageUrl}
                        alt={slide.highlight}
                        referrerPolicy="no-referrer"
                        className="w-44 h-44 sm:w-52 sm:h-52 object-contain filter drop-shadow-2xl z-10 transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <span className="text-7xl sm:text-8xl select-none filter drop-shadow-lg animate-pulse absolute">
                      {slide.emoji}
                    </span>
                  </div>

                  {/* Secondary mini floating badge */}
                  <div className="absolute -bottom-2 bg-neutral-900 border border-neutral-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 z-20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>24oz / 32oz 빅사이즈 제공</span>
                  </div>
                </div>

                <div className="space-y-1 mt-4">
                  <h3 className="text-xl font-black text-white">{slide.highlight}</h3>
                  <p className="text-xs text-neutral-400">메가MGC커피 공식 추천 레시피</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Bottom Controls & Dots */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx 
                    ? 'w-8 bg-[#FDC913]' 
                    : 'w-2.5 bg-neutral-700 hover:bg-neutral-500'
                }`}
                aria-label={`슬라이드 ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="이전 슬라이드"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="다음 슬라이드"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
