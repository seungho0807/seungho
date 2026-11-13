import React from 'react';
import { MapPin, Clock, Award, Zap, ChevronRight } from 'lucide-react';
import { Store } from '../types';

interface QuickSmartBarProps {
  selectedStore: Store;
  onSelectStoreClick: () => void;
  onOpenStamps: () => void;
  onQuickOrderIceAmericano: () => void;
}

export const QuickSmartBar: React.FC<QuickSmartBarProps> = ({
  selectedStore,
  onSelectStoreClick,
  onOpenStamps,
  onQuickOrderIceAmericano,
}) => {
  return (
    <div className="bg-white border-b border-neutral-200/90 shadow-xs relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 lg:gap-4 items-center">
          
          {/* 1. Store selector widget */}
          <button
            onClick={onSelectStoreClick}
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/80 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-[#FDC913] flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-5 h-5 text-neutral-900" />
              </div>
              <div className="truncate">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900">
                  <span>픽업 지정 매장</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-emerald-700 font-semibold">{selectedStore.distance}</span>
                </div>
                <div className="text-sm font-black text-neutral-900 truncate group-hover:text-amber-800">
                  {selectedStore.name}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-700 shrink-0 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 2. Wait time indicator */}
          <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div className="w-9 h-9 rounded-xl bg-neutral-200 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-neutral-700" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-neutral-500">실시간 매장 혼잡도</div>
              <div className="text-sm font-black text-neutral-900 flex items-center gap-1.5">
                <span className="text-emerald-600">여유</span>
                <span className="text-neutral-400">|</span>
                <span>제조 예상 5분 (대기 2팀)</span>
              </div>
            </div>
          </div>

          {/* 3. Stamp & Membership status */}
          <button
            onClick={onOpenStamps}
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-[#261814] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#FDC913]" />
              </div>
              <div className="truncate">
                <div className="text-[11px] font-bold text-neutral-500">메가 스탬프 적립</div>
                <div className="text-sm font-black text-neutral-900 flex items-center gap-1.5">
                  <span className="text-[#e5a000]">7 / 10개</span>
                  <span className="text-xs font-semibold text-neutral-500">(3개 남음)</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 4. Quick Reorder Shortcut */}
          <button
            onClick={onQuickOrderIceAmericano}
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-amber-400 to-[#FDC913] hover:from-amber-500 hover:to-yellow-400 text-neutral-950 shadow-xs transition-all cursor-pointer group active:scale-95"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-neutral-950/10 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-neutral-950 fill-neutral-950" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-extrabold text-neutral-800">1초 퀵오더</div>
                <div className="text-xs font-black text-neutral-950">아이스 아메리카노 (2,000원)</div>
              </div>
            </div>
            <span className="text-xs font-black bg-neutral-950 text-[#FDC913] px-2.5 py-1 rounded-lg">
              담기 +
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};
