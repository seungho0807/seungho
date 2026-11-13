import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Plus, AlertCircle, Heart } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const CATEGORIES: { id: MenuCategory; label: string; icon: string }[] = [
  { id: 'all', label: '전체 메뉴', icon: '✨' },
  { id: 'coffee', label: '커피 & 콜드브루', icon: '☕' },
  { id: 'smoothie', label: '스무디 & 프라페', icon: '🍧' },
  { id: 'beverage', label: '에이드 & 주스', icon: '🍹' },
  { id: 'tea', label: '티 & 블렌딩', icon: '🍵' },
  { id: 'dessert', label: '디저트 & 베이커리', icon: '🥐' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  favorites,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyDecaf, setOnlyDecaf] = useState(false);
  const [onlyBest, setOnlyBest] = useState(false);
  const [onlyIce, setOnlyIce] = useState(false);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchEng = item.engName.toLowerCase().includes(query);
        const matchDesc = item.desc.toLowerCase().includes(query);
        if (!matchName && !matchEng && !matchDesc) return false;
      }
      // Filter chips
      if (onlyDecaf && !item.isDecafAvailable) return false;
      if (onlyBest && !item.isBest) return false;
      if (onlyIce && !item.isIceOnly) return false;

      return true;
    });
  }, [items, selectedCategory, searchQuery, onlyDecaf, onlyBest, onlyIce]);

  return (
    <section id="menu" className="py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>MEGA MENU EXPLORER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            취향대로 골라 즐기는 <span className="text-amber-600">메가MGC 전메뉴</span>
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base">
            대용량 빅사이즈 음료부터 갓 구운 바삭한 디저트까지, 원하는 옵션을 직접 골라 바로 주문해보세요.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-neutral-200/90 shadow-sm space-y-5 mb-8">
          
          {/* Top Row: Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="메뉴명, 재료명 검색 (예: 아메리카노, 퐁크러쉬, 설향 딸기, 감자빵...)"
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-neutral-100/80 hover:bg-neutral-100 focus:bg-white border border-neutral-200 focus:border-[#FDC913] focus:ring-2 focus:ring-amber-300/40 text-sm font-semibold text-neutral-900 placeholder-neutral-400 outline-hidden transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-700 bg-neutral-200 hover:bg-neutral-300 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#261814] text-[#FDC913] shadow-md shadow-neutral-950/20 scale-[1.02]'
                      : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Filter Sub-Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-500 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                빠른 필터:
              </span>

              <button
                onClick={() => setOnlyBest(!onlyBest)}
                className={`px-3 py-1.5 rounded-full font-bold transition-colors cursor-pointer border ${
                  onlyBest
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                🔥 인기 베스트만
              </button>

              <button
                onClick={() => setOnlyDecaf(!onlyDecaf)}
                className={`px-3 py-1.5 rounded-full font-bold transition-colors cursor-pointer border ${
                  onlyDecaf
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                🌿 디카페인 가능
              </button>

              <button
                onClick={() => setOnlyIce(!onlyIce)}
                className={`px-3 py-1.5 rounded-full font-bold transition-colors cursor-pointer border ${
                  onlyIce
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                🧊 ICE 전용 메뉴
              </button>
            </div>

            <span className="text-neutral-400 font-semibold">
              총 <span className="text-amber-700 font-black">{filteredItems.length}</span>개의 메뉴
            </span>
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 max-w-md mx-auto my-6 space-y-3">
            <AlertCircle className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="text-lg font-black text-neutral-800">일치하는 메뉴가 없습니다</h3>
            <p className="text-xs text-neutral-500">
              검색어나 필터 조건을 변경하여 다시 찾아보세요.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyBest(false);
                setOnlyDecaf(false);
                setOnlyIce(false);
              }}
              className="mt-2 text-xs font-black text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredItems.map((item) => {
              const isFav = favorites.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-neutral-200/90 hover:border-amber-300 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
                >
                  {/* Top Image Preview Box */}
                  <div 
                    onClick={() => onSelectItem(item)}
                    className={`relative p-6 bg-gradient-to-br ${item.gradient} text-white flex flex-col items-center justify-center cursor-pointer`}
                  >
                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1">
                      {item.badge && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-neutral-950/80 text-[#FDC913] backdrop-blur-xs">
                          {item.badge}
                        </span>
                      )}
                      {item.isIceOnly && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-sky-600/90 text-white">
                          ICE
                        </span>
                      )}
                    </div>

                    {/* Favorite toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/70 hover:bg-white text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer"
                      aria-label="즐겨찾기"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 group-hover:scale-105 transition-transform duration-300 my-1 relative overflow-hidden p-1.5">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain filter drop-shadow-md z-10"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : null}
                      <span className="text-4xl select-none absolute">
                        {item.imageEmoji}
                      </span>
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-200/90 truncate max-w-[180px]">
                      {item.engName}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 
                        onClick={() => onSelectItem(item)}
                        className="text-base font-black text-neutral-900 group-hover:text-amber-700 transition-colors cursor-pointer line-clamp-1"
                      >
                        {item.name}
                      </h3>
                      <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Nutrition pills */}
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-400">
                      <span>{item.calories} kcal</span>
                      {item.caffeine > 0 && (
                        <>
                          <span>•</span>
                          <span>카페인 {item.caffeine}mg</span>
                        </>
                      )}
                    </div>

                    {/* Price & Order Action */}
                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-lg font-black text-neutral-900 font-montserrat">
                        {item.price.toLocaleString()}원
                      </span>

                      <button
                        onClick={() => onSelectItem(item)}
                        className="bg-[#FDC913] hover:bg-yellow-400 active:scale-95 text-neutral-950 font-black px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>옵션선택</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
