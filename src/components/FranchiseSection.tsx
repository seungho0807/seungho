import React, { useState } from 'react';
import { Award, ShieldCheck, Calculator, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { FRANCHISE_METRICS } from '../data/mockData';

interface FranchiseSectionProps {
  onOpenFranchiseModal: () => void;
}

export const FranchiseSection: React.FC<FranchiseSectionProps> = ({ onOpenFranchiseModal }) => {
  const [storeSize, setStoreSize] = useState<10 | 15 | 20>(15);

  // Dynamic cost calculation based on square footage
  const interiorCost = storeSize * 210; // in 10,000 KRW
  const franchiseFee = 500;
  const educationFee = 300;
  const equipmentCost = 2800;
  const initialSupplies = 600;
  const totalCost = interiorCost + franchiseFee + educationFee + equipmentCost + initialSupplies;

  return (
    <section id="franchise" className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDC913]/20 border border-[#FDC913]/40 text-[#FDC913] text-xs font-black tracking-wider uppercase">
            <Award className="w-4 h-4" />
            <span>KOREA NO.1 COFFEE FRANCHISE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            압도적인 성장률, 검증된 성공 파트너<br />
            <span className="text-[#FDC913]">메가MGC커피와 함께하세요</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            자체 대형 로스팅 플랜트와 탄탄한 공급망 시스템, 지속적인 슈퍼바이저 밀착 케어로
            초보 창업자도 흔들림 없는 높은 매출과 안정적인 운영을 보장합니다.
          </p>
        </div>

        {/* 4 Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FRANCHISE_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="bg-neutral-800/80 border border-neutral-700/80 rounded-3xl p-6 backdrop-blur-xs flex flex-col justify-between hover:border-[#FDC913] transition-colors"
            >
              <div className="text-xs font-bold text-neutral-400">{metric.label}</div>
              <div className="my-3">
                <span className="text-3xl sm:text-4xl font-black text-[#FDC913] font-montserrat">
                  {metric.value}
                </span>
                <span className="text-sm font-bold text-neutral-300 ml-1.5">{metric.unit}</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">{metric.desc}</p>
            </div>
          ))}
        </div>

        {/* 2-Column Section: Left 4-Step Process, Right Real-time Cost Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-800/50 rounded-3xl border border-neutral-700 p-6 sm:p-10">
          
          {/* Left: 4 Step Startup Process (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-[#FDC913] uppercase tracking-wider">
                STEP-BY-STEP PROCESS
              </span>
              <h3 className="text-2xl font-black text-white">체계적인 4단계 창업 로드맵</h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                가맹 상담부터 오픈 이후 사후 매출 관리까지 본사가 든든하게 동행합니다.
              </p>
            </div>

            <div className="space-y-3.5">
              {[
                { step: '01', title: '1:1 맞춤 창업 상담 및 예산 기획', desc: '상담 신청 후 전문 창업 컨설턴트 배정 및 지역별 예상 견적 수립' },
                { step: '02', title: '빅데이터 기반 A급 점포 상권 분석', desc: '유동인구, 배후 주거·오피스 밀집도, 경쟁사 분석을 통한 최적 입지 선정' },
                { step: '03', title: '가맹 계약 및 본사 아카데미 실습 교육', desc: '바리스타 제조 실습, 포스 운영, 위생 및 서비스 노하우 집중 트레이닝' },
                { step: '04', title: '인테리어 완공 및 오픈 지원 프로모션', desc: '본사 슈퍼바이저 파견 지원, 오픈 기념 시음회 및 온·오프라인 마케팅 집행' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-700/60">
                  <span className="w-8 h-8 rounded-xl bg-[#FDC913] text-neutral-950 font-black text-sm flex items-center justify-center shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenFranchiseModal}
                className="bg-[#FDC913] hover:bg-yellow-400 text-neutral-950 font-black px-6 py-3.5 rounded-2xl text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>1:1 안심 창업 무료 상담 신청</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Interactive Cost Calculator (6 cols) */}
          <div className="lg:col-span-6 bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-700 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#FDC913]" />
                <span className="text-sm font-black text-white">창업 예상 비용 시뮬레이터</span>
              </div>
              <span className="text-[11px] text-neutral-400 font-semibold">부가세 별도 기준</span>
            </div>

            {/* Store size toggle buttons */}
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-2">
                희망 점포 평수 선택:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([10, 15, 20] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setStoreSize(size)}
                    className={`py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                      storeSize === size
                        ? 'bg-[#FDC913] text-neutral-950 shadow-md scale-102'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {size}평형 {size === 15 && '(추천)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Breakdown costs */}
            <div className="space-y-2.5 text-xs text-neutral-300 bg-neutral-800/60 p-4 rounded-2xl border border-neutral-700/60">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">가맹비 (브랜드 상표권 및 노하우)</span>
                <span className="font-bold">{franchiseFee.toLocaleString()}만원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">교육비 (바리스타/경영 실무)</span>
                <span className="font-bold">{educationFee.toLocaleString()}만원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">인테리어 시공 ({storeSize}평 기준)</span>
                <span className="font-bold">{interiorCost.toLocaleString()}만원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">주방 기기 및 집기 (커피머신, 제빙기 등)</span>
                <span className="font-bold">{equipmentCost.toLocaleString()}만원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">초도 물품 및 홍보물</span>
                <span className="font-bold">{initialSupplies.toLocaleString()}만원</span>
              </div>
            </div>

            {/* Total Estimated Cost */}
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400 font-bold">예상 총 창업비용</span>
                <div className="text-2xl sm:text-3xl font-black text-[#FDC913] font-montserrat">
                  약 {totalCost.toLocaleString()} 만원
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-emerald-400 font-bold block flex items-center gap-1 justify-end">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  로열티 정액제 (월 15만원)
                </span>
                <span className="text-[10px] text-neutral-500">점포 임차보증금 제외</span>
              </div>
            </div>

            <button
              onClick={onOpenFranchiseModal}
              className="w-full py-3.5 bg-white hover:bg-neutral-100 text-neutral-950 font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{storeSize}평형 상세 창업 제안서 및 상담 요청</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
