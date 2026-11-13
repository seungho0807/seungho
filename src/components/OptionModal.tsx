import React, { useState, useEffect, useMemo } from 'react';
import { X, Plus, Minus, Coffee, Check, Info } from 'lucide-react';
import { MenuItem, CustomOptions } from '../types';

interface OptionModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, options: CustomOptions) => void;
}

export const OptionModal: React.FC<OptionModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [temp, setTemp] = useState<'ICE' | 'HOT'>('ICE');
  const [bean, setBean] = useState<'regular' | 'decaf'>('regular');
  const [shots, setShots] = useState<number>(1); // 0: 연하게, 1: 보통, 2: 샷추가
  const [sweetness, setSweetness] = useState<'regular' | 'less' | 'stevia' | 'syrup'>('regular');
  const [topping, setTopping] = useState<'none' | 'pearl' | 'icecream'>('none');
  const [iceLevel, setIceLevel] = useState<'less' | 'regular' | 'more'>('regular');
  const [useTumbler, setUseTumbler] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [showNutrition, setShowNutrition] = useState<boolean>(false);

  // Reset states when item changes
  useEffect(() => {
    if (!item) return;
    setTemp('ICE');
    setBean('regular');
    setShots(1);
    setSweetness('regular');
    setTopping('none');
    setIceLevel('regular');
    setUseTumbler(false);
    setQuantity(1);
    setShowNutrition(false);
  }, [item]);

  // Calculate unit price based on options
  const unitPrice = useMemo(() => {
    if (!item) return 0;
    let price = item.price;
    if (bean === 'decaf') price += 500;
    if (shots === 2) price += 500;
    if (sweetness === 'stevia') price += 600;
    if (sweetness === 'syrup') price += 500;
    if (topping === 'pearl') price += 700;
    if (topping === 'icecream') price += 800;
    if (useTumbler) price = Math.max(0, price - 300);
    return price;
  }, [item, bean, shots, sweetness, topping, useTumbler]);

  if (!isOpen || !item) return null;

  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    const options: CustomOptions = {
      temp,
      bean,
      shots,
      sweetness,
      topping,
      iceLevel,
      useTumbler,
      quantity,
    };
    onAddToCart(item, options);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FDC913]" />
            <h3 className="text-lg font-black text-neutral-900">메가오더 커스텀 옵션</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Item Top Overview */}
          <div className="flex gap-4 items-center bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center text-3xl shrink-0 shadow-xs relative overflow-hidden p-1`}>
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter drop-shadow-xs z-10"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}
              <span className="text-2xl select-none absolute">{item.imageEmoji}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-neutral-900 text-[#FDC913]">
                  {item.category.toUpperCase()}
                </span>
                <span className="text-xs text-neutral-400 font-bold">{item.engName}</span>
              </div>
              <h4 className="text-base font-black text-neutral-900 mt-0.5">{item.name}</h4>
              <div className="text-sm font-extrabold text-amber-700 font-montserrat">
                기본 {item.price.toLocaleString()}원
              </div>
            </div>
          </div>

          {/* Nutrition accordion button */}
          <div>
            <button
              onClick={() => setShowNutrition(!showNutrition)}
              className="text-xs font-bold text-neutral-500 hover:text-neutral-800 flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-amber-600" />
              <span>영양성분 및 알레르기 안내 {showNutrition ? '접기 ▲' : '보기 ▼'}</span>
            </button>
            {showNutrition && (
              <div className="mt-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 grid grid-cols-3 gap-2 text-center animate-in fade-in">
                <div className="p-1.5 bg-white rounded-lg">
                  <span className="block text-[10px] text-neutral-400">열량</span>
                  <span className="font-black text-neutral-900">{item.calories} kcal</span>
                </div>
                <div className="p-1.5 bg-white rounded-lg">
                  <span className="block text-[10px] text-neutral-400">카페인</span>
                  <span className="font-black text-neutral-900">{item.caffeine} mg</span>
                </div>
                <div className="p-1.5 bg-white rounded-lg">
                  <span className="block text-[10px] text-neutral-400">당류</span>
                  <span className="font-black text-neutral-900">{item.sugar} g</span>
                </div>
              </div>
            )}
          </div>

          {/* Option: Temperature (HOT / ICE) */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-neutral-800">음료 온도 선택</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTemp('ICE')}
                className={`py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  temp === 'ICE'
                    ? 'bg-sky-500 text-white shadow-sm ring-2 ring-sky-300'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <span>🧊 ICE (차갑게)</span>
              </button>

              <button
                type="button"
                onClick={() => !item.isIceOnly && setTemp('HOT')}
                disabled={item.isIceOnly}
                className={`py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  item.isIceOnly
                    ? 'bg-neutral-100 text-neutral-300 cursor-not-allowed'
                    : temp === 'HOT'
                    ? 'bg-rose-500 text-white shadow-sm ring-2 ring-rose-300'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 cursor-pointer'
                }`}
              >
                <span>🔥 HOT (따뜻하게)</span>
                {item.isIceOnly && <span className="text-[10px]">(불가)</span>}
              </button>
            </div>
          </div>

          {/* Option: Bean selection (Regular vs Decaf) */}
          {item.category === 'coffee' && item.isDecafAvailable && (
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-neutral-800">원두 선택</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBean('regular')}
                  className={`p-3 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                    bean === 'regular'
                      ? 'bg-amber-100 border-2 border-[#FDC913] text-neutral-900'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <span>기본 아라비카 블렌드</span>
                  <span className="text-[11px] font-semibold text-neutral-500">+0원</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBean('decaf')}
                  className={`p-3 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                    bean === 'decaf'
                      ? 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <span>디카페인 원두</span>
                  <span className="text-[11px] font-bold text-emerald-700">+500원</span>
                </button>
              </div>
            </div>
          )}

          {/* Option: Espresso Shots */}
          {item.category === 'coffee' && (
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-neutral-800">에스프레소 샷 조절</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { value: 0, label: '연하게 (1샷)', add: '+0원' },
                  { value: 1, label: '기본 (투샷)', add: '+0원' },
                  { value: 2, label: '샷 추가 (+1샷)', add: '+500원' },
                ].map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setShots(s.value)}
                    className={`p-2.5 rounded-xl font-bold transition-all text-center cursor-pointer ${
                      shots === s.value
                        ? 'bg-neutral-900 text-[#FDC913] ring-2 ring-neutral-800'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <div>{s.label}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{s.add}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Option: Sweetness */}
          {item.category !== 'dessert' && (
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-neutral-800">당도 / 시럽 선택</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSweetness('regular')}
                  className={`p-2.5 rounded-xl font-bold transition-all flex items-center justify-between cursor-pointer ${
                    sweetness === 'regular' ? 'bg-[#261814] text-white' : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  <span>기본 당도</span>
                  <span className="text-[10px] text-neutral-400">+0원</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSweetness('less')}
                  className={`p-2.5 rounded-xl font-bold transition-all flex items-center justify-between cursor-pointer ${
                    sweetness === 'less' ? 'bg-[#261814] text-white' : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  <span>덜 달게 (50%)</span>
                  <span className="text-[10px] text-neutral-400">+0원</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSweetness('stevia')}
                  className={`p-2.5 rounded-xl font-bold transition-all flex items-center justify-between cursor-pointer ${
                    sweetness === 'stevia' ? 'bg-[#261814] text-white' : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  <span>천연 스테비아 변경</span>
                  <span className="text-[10px] text-[#FDC913] font-bold">+600원</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSweetness('syrup')}
                  className={`p-2.5 rounded-xl font-bold transition-all flex items-center justify-between cursor-pointer ${
                    sweetness === 'syrup' ? 'bg-[#261814] text-white' : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  <span>바닐라 시럽 추가</span>
                  <span className="text-[10px] text-[#FDC913] font-bold">+500원</span>
                </button>
              </div>
            </div>
          )}

          {/* Option: Toppings */}
          {item.category === 'smoothie' || item.category === 'beverage' ? (
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-neutral-800">토핑 추가</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'none', label: '선택 안함', add: '+0원' },
                  { id: 'pearl', label: '쫀득 타피오카 펄', add: '+700원' },
                  { id: 'icecream', label: '바닐라 아이스크림', add: '+800원' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTopping(t.id as 'none' | 'pearl' | 'icecream')}
                    className={`p-2.5 rounded-xl font-bold transition-all text-center cursor-pointer ${
                      topping === t.id
                        ? 'bg-amber-500 text-neutral-950 ring-2 ring-amber-400'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <div>{t.label}</div>
                    <div className="text-[10px] text-neutral-500">{t.add}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Option: Tumbler Discount */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-emerald-700" />
              <div>
                <span className="text-xs font-black text-emerald-900 block">개인 텀블러 할인 혜택</span>
                <span className="text-[10px] text-emerald-700">환경을 보호하고 300원 즉시 할인받으세요</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setUseTumbler(!useTumbler)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                useTumbler ? 'bg-emerald-700 text-white shadow-xs' : 'bg-white text-emerald-700 border border-emerald-300'
              }`}
            >
              {useTumbler ? '✓ 300원 할인 적용' : '적용하기'}
            </button>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-extrabold text-neutral-800">주문 수량</span>
            <div className="flex items-center gap-3 bg-neutral-100 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl bg-white hover:bg-neutral-200 flex items-center justify-center font-bold text-neutral-700 cursor-pointer shadow-xs"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-montserrat font-black text-base text-neutral-900 w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-8 h-8 rounded-xl bg-white hover:bg-neutral-200 flex items-center justify-center font-bold text-neutral-700 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Modal Bottom Fixed CTA */}
        <div className="p-5 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-neutral-500 block">총 결제 예정 금액</span>
            <span className="text-2xl font-black text-neutral-950 font-montserrat">
              {totalPrice.toLocaleString()}원
            </span>
          </div>

          <button
            onClick={handleConfirm}
            className="flex-1 py-3.5 bg-[#FDC913] hover:bg-yellow-400 text-neutral-950 font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-300/40 active:scale-95 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>장바구니에 담기 ({quantity}개)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
