import React from 'react';
import { Coffee, Phone, Mail, Instagram, Youtube, Facebook } from 'lucide-react';

interface FooterProps {
  onNotify?: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNotify }) => {
  return (
    <footer className="bg-[#1A1412] text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FDC913] text-neutral-950 font-black flex items-center justify-center text-sm">
                MGC
              </div>
              <span className="font-montserrat font-black text-lg text-white tracking-tight">
                MEGA <span className="text-[#FDC913]">MGC</span> COFFEE
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              압도적인 대용량 24oz 빅사이즈와 고품질 아라비카 원두 블렌딩으로 일상의 즐거움과 활력을 선물합니다.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="#hero" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#FDC913] hover:text-neutral-950 flex items-center justify-center text-white transition-colors" aria-label="인스타그램">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#hero" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#FDC913] hover:text-neutral-950 flex items-center justify-center text-white transition-colors" aria-label="유튜브">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#hero" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#FDC913] hover:text-neutral-950 flex items-center justify-center text-white transition-colors" aria-label="페이스북">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">메가 서비스</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#hero" className="hover:text-white transition-colors">시즌 신메뉴 & 프로모션</a></li>
              <li><a href="#best" className="hover:text-white transition-colors">실시간 인기 음료 베스트</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">전 메뉴 영양성분 & 알레르기</a></li>
              <li><a href="#store" className="hover:text-white transition-colors">가까운 메가 매장 찾기</a></li>
              <li><a href="#franchise" className="hover:text-white transition-colors">가맹 창업 상담 센터</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">고객 감동 센터</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-black text-xl font-montserrat">
                <Phone className="w-5 h-5 text-[#FDC913]" />
                <span>1588-0656</span>
              </div>
              <p className="text-neutral-400">
                평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)<br />
                주말 및 공휴일 휴무
              </p>
              <div className="flex items-center gap-1.5 text-neutral-400 pt-1">
                <Mail className="w-3.5 h-3.5 text-[#FDC913]" />
                <span>help@megamgccoffee.com</span>
              </div>
            </div>
          </div>

          {/* Mobile App Download Card */}
          <div className="bg-neutral-800/80 p-5 rounded-2xl border border-neutral-700 space-y-3">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[#FDC913]" />
              <h4 className="text-sm font-bold text-white">메가MGC커피 공식 APP</h4>
            </div>
            <p className="text-[11px] text-neutral-400">
              스탬프 적립, 메가오더 픽업 주문, 전용 모바일 쿠폰을 스마트폰 앱으로 더 편리하게!
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button 
                onClick={() => onNotify?.('📱 메가MGC커피 App Store 다운로드 안내가 준비되었습니다.')}
                className="flex-1 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-950 text-white font-bold text-[11px] border border-neutral-700 cursor-pointer"
              >
                App Store
              </button>
              <button 
                onClick={() => onNotify?.('📱 메가MGC커피 Google Play 다운로드 안내가 준비되었습니다.')}
                className="flex-1 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-950 text-white font-bold text-[11px] border border-neutral-700 cursor-pointer"
              >
                Google Play
              </button>
            </div>
          </div>

        </div>

        {/* Corporate Legal & Copyright */}
        <div className="pt-8 border-t border-neutral-800 space-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-neutral-300 font-semibold">
            <a href="#hero" className="hover:text-white">회사소개</a>
            <a href="#hero" className="hover:text-white font-bold text-white">개인정보처리방침</a>
            <a href="#hero" className="hover:text-white">이용약관</a>
            <a href="#store" className="hover:text-white">위치기반서비스 이용약관</a>
            <a href="#franchise" className="hover:text-white">가맹상담문의</a>
          </div>

          <div className="text-[11px] text-neutral-500 leading-relaxed space-y-1">
            <p>
              (주)앤하우스 | 대표이사: 김대영 | 서울특별시 강남구 강남대로 518 11층 (논현동) | 사업자등록번호: 105-87-57896
            </p>
            <p>
              통신판매업신고: 제 2020-서울강남-02492호 | 대표전화: 1588-0656 | 팩스: 02-325-5199
            </p>
            <p className="text-neutral-600 pt-1">
              Copyright © MEGA MGC COFFEE. All Rights Reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
