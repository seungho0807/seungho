import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { CartItem, Store } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  selectedStore: Store;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  selectedStore,
}) => {
  const [orderType, setOrderType] = useState<'takeout' | 'hall'>('takeout');
  const [needCarrier, setNeedCarrier] = useState(false);
  const [needStraw, setNeedStraw] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'mega' | 'kakao' | 'naver' | 'card'>('mega');
  
  // Checkout order placement state
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleCheckout = () => {
    const randomNum = `A-${Math.floor(100 + Math.random() * 900)}`;
    setOrderNumber(randomNum);
    setIsOrderPlaced(true);
  };

  const handleFinishOrder = () => {
    setIsOrderPlaced(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FDC913] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-neutral-900" />
            </div>
            <div>
              <h3 className="text-base font-black text-neutral-900">메가오더 장바구니</h3>
              <p className="text-[11px] font-semibold text-neutral-500">
                픽업 매장: <span className="text-amber-800 font-bold">{selectedStore.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
            aria-label="장바구니 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Order Placed Screen (Receipt & Status) */}
        {isOrderPlaced ? (
          <div className="flex-1 p-6 overflow-y-auto flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-md">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                주문 접수 완료
              </span>
              <h4 className="text-2xl font-black text-neutral-900 pt-2">
                주문번호 <span className="text-[#e5a000]">{orderNumber}</span>
              </h4>
              <p className="text-xs text-neutral-500">
                바리스타가 신선한 원두로 음료를 정성껏 제조 중입니다.
              </p>
            </div>

            {/* Realtime progress tracker */}
            <div className="w-full bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-600">
                <span className="text-emerald-600">● 1. 접수완료</span>
                <span className="text-amber-600 animate-pulse">● 2. 음료 제조중</span>
                <span className="text-neutral-400">○ 3. 픽업대기</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden">
                <div className="w-2/3 h-full bg-gradient-to-r from-emerald-500 to-[#FDC913] rounded-full animate-pulse" />
              </div>
              <div className="text-[11px] text-neutral-400 flex items-center justify-center gap-1">
                <span>예상 대기 시간: </span>
                <span className="font-black text-neutral-800">약 5분 후 준비 완료</span>
              </div>
            </div>

            {/* Simulated Digital Barcode */}
            <div className="w-full bg-white border border-neutral-300 p-4 rounded-2xl shadow-xs space-y-2">
              <div className="text-[11px] font-bold text-neutral-500">매장 픽업 바코드</div>
              <div className="flex justify-center py-2 text-neutral-800">
                <div className="flex items-center gap-1 font-mono tracking-widest text-3xl font-black select-none">
                  || | ||| | || ||| || |||
                </div>
              </div>
              <div className="text-[10px] text-neutral-400 font-mono">
                {orderNumber}-88392-MEGA
              </div>
            </div>

            {/* Order Summary receipt list */}
            <div className="w-full bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between font-bold text-neutral-700 pb-1 border-b border-neutral-200">
                <span>픽업 장소</span>
                <span>{selectedStore.name}</span>
              </div>
              <div className="flex justify-between font-bold text-neutral-700 pb-1 border-b border-neutral-200">
                <span>포장 방식</span>
                <span>{orderType === 'takeout' ? '테이크아웃 (포장)' : '매장 내 취식'}</span>
              </div>
              <div className="flex justify-between font-black text-neutral-900 pt-1">
                <span>총 결제 금액</span>
                <span className="text-amber-700 font-montserrat">{subtotal.toLocaleString()}원</span>
              </div>
            </div>

            <button
              onClick={handleFinishOrder}
              className="w-full py-3.5 bg-[#FDC913] hover:bg-yellow-400 text-neutral-950 font-black rounded-2xl text-sm transition-all cursor-pointer shadow-md"
            >
              확인 (홈으로 이동)
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart View */
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-black text-neutral-800">장바구니가 비어 있습니다</h4>
              <p className="text-xs text-neutral-400 mt-1">
                메가커피의 맛있는 음료와 디저트를 골라 담아보세요!
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 text-[#FDC913] text-xs font-black cursor-pointer hover:bg-neutral-800"
            >
              메뉴 고르러 가기
            </button>
          </div>
        ) : (
          /* Active Cart Items List & Options */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Scrollable Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.map((cartItem) => {
                const { menuItem, options, totalPrice, quantity, cartId } = cartItem;
                return (
                  <div
                    key={cartId}
                    className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between gap-3"
                  >
                    <div className="flex gap-3 items-start justify-between">
                      <div className="flex gap-3">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${menuItem.gradient} text-white flex items-center justify-center text-2xl shrink-0 shadow-2xs relative overflow-hidden p-1`}>
                          {menuItem.imageUrl ? (
                            <img
                              src={menuItem.imageUrl}
                              alt={menuItem.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain filter drop-shadow-xs z-10"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : null}
                          <span className="text-xl select-none absolute">{menuItem.imageEmoji}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-neutral-800 text-white">
                              {options.temp}
                            </span>
                            <h4 className="text-sm font-black text-neutral-900">{menuItem.name}</h4>
                          </div>

                          {/* Selected Custom Options Summary */}
                          <div className="text-[11px] text-neutral-500 mt-1 space-y-0.5">
                            <div>• {options.bean === 'decaf' ? '디카페인 원두' : '기본 원두'} / {options.shots === 2 ? '샷 추가' : options.shots === 0 ? '연하게' : '기본 2샷'}</div>
                            {options.sweetness !== 'regular' && (
                              <div>• {options.sweetness === 'stevia' ? '스테비아' : options.sweetness === 'syrup' ? '바닐라시럽' : '덜 달게'}</div>
                            )}
                            {options.topping !== 'none' && (
                              <div>• 토핑: {options.topping === 'pearl' ? '펄 추가' : '아이스크림'}</div>
                            )}
                            {options.useTumbler && (
                              <div className="text-emerald-600 font-bold">• 텀블러 할인 (-300원)</div>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(cartId)}
                        className="text-neutral-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                        aria-label="항목 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity & Item Total */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-200/80">
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-neutral-200">
                        <button
                          onClick={() => onUpdateQuantity(cartId, -1)}
                          className="w-5 h-5 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black text-neutral-900 w-4 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartId, 1)}
                          className="w-5 h-5 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-black text-neutral-900 font-montserrat">
                        {totalPrice.toLocaleString()}원
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Bottom Checkout Configuration */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 space-y-4">
              
              {/* Takeout or Hall */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setOrderType('takeout')}
                  className={`py-2.5 rounded-xl font-black transition-all cursor-pointer ${
                    orderType === 'takeout'
                      ? 'bg-neutral-900 text-[#FDC913] shadow-xs'
                      : 'bg-white border border-neutral-200 text-neutral-600'
                  }`}
                >
                  🛍️ 포장하기 (테이크아웃)
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('hall')}
                  className={`py-2.5 rounded-xl font-black transition-all cursor-pointer ${
                    orderType === 'hall'
                      ? 'bg-neutral-900 text-[#FDC913] shadow-xs'
                      : 'bg-white border border-neutral-200 text-neutral-600'
                  }`}
                >
                  ☕ 매장 이용
                </button>
              </div>

              {/* Checkbox preferences */}
              <div className="flex items-center justify-between text-xs text-neutral-600 px-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needCarrier}
                    onChange={(e) => setNeedCarrier(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span>캐리어(포장백) 필요</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needStraw}
                    onChange={(e) => setNeedStraw(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span>빨대 챙겨주세요</span>
                </label>
              </div>

              {/* Payment selection */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-neutral-500">결제 수단</span>
                <div className="grid grid-cols-4 gap-1.5 text-[11px]">
                  {[
                    { id: 'mega', label: '메가페이' },
                    { id: 'kakao', label: '카카오페이' },
                    { id: 'naver', label: '네이버페이' },
                    { id: 'card', label: '신용카드' },
                  ].map((pay) => (
                    <button
                      key={pay.id}
                      type="button"
                      onClick={() => setPaymentMethod(pay.id as 'mega' | 'kakao' | 'naver' | 'card')}
                      className={`py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                        paymentMethod === pay.id
                          ? 'bg-[#FDC913] text-neutral-950 border-[#e5a000]'
                          : 'bg-white text-neutral-600 border-neutral-200'
                      }`}
                    >
                      {pay.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subtotal & Checkout CTA */}
              <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-neutral-500 block">총 결제 금액</span>
                  <span className="text-2xl font-black text-neutral-950 font-montserrat">
                    {subtotal.toLocaleString()}원
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="py-3 px-6 bg-[#FDC913] hover:bg-yellow-400 text-neutral-950 font-black rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-amber-300/40 active:scale-95 transition-all cursor-pointer"
                >
                  <span>결제 및 픽업 주문</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
