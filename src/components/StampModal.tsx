import React from 'react';
import { X, Award, Coffee, Sparkles, Gift, Clock } from 'lucide-react';

interface StampModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StampModal: React.FC<StampModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const totalStamps = 10;
  const currentStamps = 7;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-neutral-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#261814] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FDC913] flex items-center justify-center text-neutral-950 font-black">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">메가MGC 멤버십 스탬프</h3>
              <p className="text-[11px] text-amber-200 font-semibold">10개 적립 시 아메리카노(HOT/ICE) 1잔 무료!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Stamp Board Grid (2 rows of 5) */}
          <div className="bg-amber-50/70 p-5 rounded-3xl border border-amber-200/80 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                스탬프 적립판
              </span>
              <span className="text-amber-800 font-black font-montserrat">
                {currentStamps} / {totalStamps}개
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              {Array.from({ length: totalStamps }).map((_, index) => {
                const isStamped = index < currentStamps;
                const isLast = index === totalStamps - 1;
                return (
                  <div
                    key={index}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-transform duration-200 ${
                      isStamped
                        ? 'bg-[#FDC913] text-neutral-950 shadow-sm border-2 border-amber-400 scale-102'
                        : isLast
                        ? 'bg-rose-100 text-rose-700 border-2 border-dashed border-rose-300'
                        : 'bg-white text-neutral-300 border-2 border-dashed border-neutral-200'
                    }`}
                  >
                    {isStamped ? (
                      <Coffee className="w-5 h-5 fill-neutral-950 text-neutral-950" />
                    ) : isLast ? (
                      <Gift className="w-5 h-5 text-rose-500 animate-pulse" />
                    ) : (
                      <span className="text-xs font-black">{index + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center text-[11px] font-bold text-amber-900 bg-white/70 py-1.5 px-3 rounded-xl border border-amber-200/50">
              앞으로 <span className="text-rose-600 font-black">3잔</span>만 더 마시면 무료 커피 쿠폰이 발행됩니다!
            </div>
          </div>

          {/* Barcode widget */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-center space-y-2">
            <div className="text-[11px] font-bold text-neutral-500">매장 적립용 회원 바코드</div>
            <div className="font-mono text-3xl font-black tracking-widest text-neutral-800 select-none py-1">
              ||| | || |||| | ||| ||
            </div>
            <div className="text-xs font-mono text-neutral-500">010-****-5678 (회원번호)</div>
          </div>

          {/* My Coupon Box */}
          <div className="space-y-2">
            <div className="text-xs font-black text-neutral-800">보유 중인 혜택 쿠폰 (1장)</div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-emerald-950">아메리카노 1잔 무료 교환권</h4>
                  <p className="text-[10px] text-emerald-700 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> 유효기간: 2026.12.31까지
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-emerald-700 text-white">
                보유중
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-[#FDC913] font-black rounded-2xl text-sm transition-colors cursor-pointer"
          >
            닫기
          </button>

        </div>
      </div>
    </div>
  );
};
