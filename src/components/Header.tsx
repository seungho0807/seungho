import React, { useState } from 'react';
import { ShoppingBag, Coffee, MapPin, Sparkles, Menu as MenuIcon, X, Award, ChevronDown } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenStamps: () => void;
  selectedStoreName: string;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenStamps,
  selectedStoreName,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
      {/* Top micro banner for promotions */}
      <div className="bg-[#261814] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#FDC913] text-neutral-950 text-[10px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              EVENT
            </span>
            <span className="text-neutral-200 hidden sm:inline">
              메가MGC커피 2026 봄 시즌 한정 메뉴 출시! 지금 메가오더로 주문 시 스탬프 2배 적립
            </span>
            <span className="text-neutral-200 sm:hidden">
              봄 시즌 메뉴 주문 시 스탬프 2배 적립!
            </span>
          </div>

          <button
            onClick={onOpenStamps}
            className="flex items-center gap-1.5 text-[#FDC913] hover:underline text-xs font-semibold cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>내 스탬프 (7/10)</span>
          </button>
        </div>
      </div>

      {/* Main GNB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-12 h-12 rounded-xl bg-[#FDC913] flex items-center justify-center shadow-md shadow-amber-300/40 group-hover:scale-105 transition-transform duration-200 border-2 border-neutral-950">
            <span className="text-neutral-950 font-black text-xl tracking-tighter">MGC</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-montserrat font-black text-2xl tracking-tighter text-neutral-950 group-hover:text-amber-600 transition-colors">
                MEGA <span className="text-[#e5a000]">MGC</span> COFFEE
              </span>
            </div>
            <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
              BIG SIZE 2 SHOTS • 즐거움이 커진다
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleNavClick('hero')}
            className="px-3.5 py-2 text-sm font-bold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#e5a000]" />
            신메뉴 & 이벤트
          </button>

          <button
            onClick={() => handleNavClick('best')}
            className="px-3.5 py-2 text-sm font-bold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            메가 베스트 TOP4
          </button>

          <button
            onClick={() => handleNavClick('menu')}
            className="px-3.5 py-2 text-sm font-bold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Coffee className="w-4 h-4 text-neutral-700" />
            전메뉴 & 스마트오더
          </button>

          <button
            onClick={() => handleNavClick('store')}
            className="px-3.5 py-2 text-sm font-bold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-neutral-700" />
            매장 찾기
          </button>

          <button
            onClick={() => handleNavClick('franchise')}
            className="px-3.5 py-2 text-sm font-bold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            가맹 창업 센터
          </button>
        </nav>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Current Store Pill (clickable to scroll to store section) */}
          <button
            onClick={() => handleNavClick('store')}
            className="hidden lg:flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300/80 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="max-w-[120px] truncate">{selectedStoreName}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
          </button>

          {/* Cart Floating Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-[#FDC913] hover:bg-[#fabc05] active:scale-95 text-neutral-950 px-4 py-2.5 rounded-full font-bold text-sm shadow-md shadow-amber-300/40 transition-all cursor-pointer border border-neutral-900/10"
            aria-label="장바구니 열기"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">메가오더</span>
            {cartCount > 0 ? (
              <span className="bg-[#261814] text-[#FDC913] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            ) : (
              <span className="text-xs text-neutral-700 font-medium">0</span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-800 hover:bg-neutral-100 rounded-lg"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2">
          <div className="p-3 bg-amber-50 rounded-xl mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#e5a000]" />
              <span className="text-xs font-bold text-neutral-800">픽업 매장: {selectedStoreName}</span>
            </div>
            <button 
              onClick={() => handleNavClick('store')}
              className="text-xs font-bold text-neutral-600 underline"
            >
              변경
            </button>
          </div>

          <button
            onClick={() => handleNavClick('hero')}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-neutral-800 hover:bg-amber-50 flex items-center justify-between"
          >
            <span>🍓 2026 봄 신메뉴 & 프로모션</span>
          </button>

          <button
            onClick={() => handleNavClick('best')}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-neutral-800 hover:bg-amber-50 flex items-center justify-between"
          >
            <span>🔥 메가 베스트 인기 메뉴 TOP 4</span>
          </button>

          <button
            onClick={() => handleNavClick('menu')}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-neutral-800 hover:bg-amber-50 flex items-center justify-between"
          >
            <span>☕ 전메뉴 둘러보기 & 스마트오더</span>
          </button>

          <button
            onClick={() => handleNavClick('store')}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-neutral-800 hover:bg-amber-50 flex items-center justify-between"
          >
            <span>📍 전국 매장 찾기 & 길안내</span>
          </button>

          <button
            onClick={() => handleNavClick('franchise')}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-neutral-800 hover:bg-amber-50 flex items-center justify-between"
          >
            <span>💡 메가커피 가맹 창업 안내</span>
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStamps();
              }}
              className="w-full py-3 bg-neutral-900 text-[#FDC913] rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>내 메가 스탬프 (7/10개) 확인하기</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
