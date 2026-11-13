import React from 'react';
import { Flame, Plus, Sparkles, Heart } from 'lucide-react';
import { MenuItem } from '../types';

interface MegaBestSectionProps {
  bestItems: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const MegaBestSection: React.FC<MegaBestSectionProps> = ({
  bestItems,
  onSelectItem,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <section id="best" className="py-14 bg-gradient-to-b from-white to-neutral-100/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black tracking-wider uppercase mb-2">
              <Flame className="w-3.5 h-3.5 fill-rose-600 text-rose-600 animate-bounce" />
              <span>REAL-TIME RANKING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">
              지금 가장 사랑받는 <span className="text-amber-600">메가 베스트 TOP 4</span>
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-1">
              오늘 수많은 손님들이 메가오더로 픽업한 검증된 시그니처 꿀조합 메뉴들입니다.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-neutral-500 bg-white px-3.5 py-2 rounded-xl border border-neutral-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#FDC913]" />
            <span>24oz 대용량 기준 프리미엄 레시피</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestItems.map((item, index) => {
            const isFav = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Ranking Tag on top left */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shadow-md ${
                    index === 0
                      ? 'bg-[#FDC913] text-neutral-950 ring-2 ring-amber-300'
                      : index === 1
                      ? 'bg-neutral-800 text-white'
                      : index === 2
                      ? 'bg-rose-500 text-white'
                      : 'bg-amber-700 text-white'
                  }`}>
                    {index + 1}
                  </span>
                  {item.badge && (
                    <span className="text-[11px] font-black px-2 py-1 rounded-lg bg-neutral-950/80 text-white backdrop-blur-xs">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Favorite Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item.id);
                  }}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-xs hover:bg-white text-neutral-400 hover:text-rose-500 transition-colors shadow-xs"
                  aria-label="즐겨찾기"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* Visual Drink Graphic Preview with Official Product Photo */}
                <div 
                  onClick={() => onSelectItem(item)}
                  className={`pt-10 pb-5 px-6 bg-gradient-to-b ${item.gradient} text-white flex flex-col items-center justify-center relative cursor-pointer group-hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="w-32 h-32 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 my-2 relative overflow-hidden p-2">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300 z-10"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <span className="text-5xl select-none absolute">
                      {item.imageEmoji}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold tracking-wider uppercase text-amber-200/90 mt-1">
                    {item.engName}
                  </div>
                </div>

                {/* Card Content & Action */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 
                      onClick={() => onSelectItem(item)}
                      className="text-lg font-black text-neutral-900 group-hover:text-amber-600 transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Price & Calories Info */}
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-neutral-400">
                        {item.calories} kcal {item.caffeine > 0 && `• 카페인 ${item.caffeine}mg`}
                      </div>
                      <div className="text-xl font-black text-neutral-950 font-montserrat">
                        {item.price.toLocaleString()}원
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectItem(item)}
                      className="bg-[#FDC913] hover:bg-yellow-400 active:scale-95 text-neutral-950 font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>담기</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
