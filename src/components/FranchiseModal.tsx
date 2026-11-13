import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Send } from 'lucide-react';

interface FranchiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FranchiseModal: React.FC<FranchiseModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('서울/수도권');
  const [budget, setBudget] = useState('1억~1억5천만원');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('성함과 연락처를 입력해 주세요.');
      return;
    }
    setErrorMsg(null);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMsg(null);
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-neutral-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-neutral-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-white">1:1 메가커피 가맹 창업 상담 신청</h3>
            <p className="text-[11px] text-[#FDC913] font-semibold mt-0.5">
              상권 분석 및 맞춤형 예상 견적서를 무료로 제공해 드립니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-black text-neutral-900">상담 신청이 접수되었습니다!</h4>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                신청하신 정보(<span className="font-bold text-neutral-800">{phone}</span>)로 
                메가MGC커피 전문 창업 컨설턴트가 24시간 이내에 친절히 연락드리겠습니다.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="py-3 px-6 bg-[#FDC913] hover:bg-yellow-400 text-neutral-950 font-black rounded-xl text-xs transition-colors cursor-pointer"
            >
              확인
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                {errorMsg}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">신청인 성함 *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-[#FDC913] text-xs font-semibold outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">연락처 *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-1234-5678"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-[#FDC913] text-xs font-semibold outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700">희망 개설 지역</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-[#FDC913] text-xs font-semibold outline-hidden bg-white"
                >
                  <option value="서울/수도권">서울 / 수도권</option>
                  <option value="경기/인천">경기 / 인천</option>
                  <option value="부산/경남">부산 / 경남</option>
                  <option value="대구/경북">대구 / 경북</option>
                  <option value="대전/충청">대전 / 충청</option>
                  <option value="광주/전라">광주 / 전라</option>
                  <option value="강원/제주">강원 / 제주</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700">예상 창업 예산</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-[#FDC913] text-xs font-semibold outline-hidden bg-white"
                >
                  <option value="8천만원 이하">8천만원 이하</option>
                  <option value="1억~1억5천만원">1억 ~ 1억 5천만원</option>
                  <option value="1억5천~2억원">1억 5천 ~ 2억원</option>
                  <option value="2억원 이상">2억원 이상</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                수집된 개인정보는 1:1 창업 상담 목적으로만 안전하게 활용되며 관계 법령에 의해 철저히 보호됩니다.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#FDC913] hover:bg-yellow-400 text-neutral-950 font-black rounded-2xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>무료 창업 상담 및 견적 신청하기</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
