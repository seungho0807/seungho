import React, { useState } from 'react';
import { MapPin, Phone, Clock, Car, Coffee, Search, Check, Navigation, ExternalLink } from 'lucide-react';
import { Store } from '../types';
import { STORES_DATA } from '../data/mockData';

interface StoreFinderSectionProps {
  currentStore: Store;
  onSelectStore: (store: Store) => void;
  onNotify?: (msg: string) => void;
}

export const StoreFinderSection: React.FC<StoreFinderSectionProps> = ({
  currentStore,
  onSelectStore,
  onNotify,
}) => {
  const [searchWord, setSearchWord] = useState('');
  const [filterDT, setFilterDT] = useState(false);
  const [filter24H, setFilter24H] = useState(false);
  const [filterParking, setFilterParking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredStores = STORES_DATA.filter((s) => {
    if (searchWord.trim()) {
      const q = searchWord.trim().toLowerCase();
      const match = s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filterDT && !s.hasDT) return false;
    if (filter24H && !s.has24H) return false;
    if (filterParking && !s.hasParking) return false;
    return true;
  });

  const handleCopyAddress = (store: Store) => {
    navigator.clipboard?.writeText(store.address);
    setCopiedId(store.id);
    onNotify?.(`📋 "${store.name}" 주소가 복사되었습니다.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="store" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black tracking-wider uppercase mb-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>MEGA STORE LOCATOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              가장 가까운 <span className="text-amber-600">메가MGC 매장 찾기</span>
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-1">
              전국 3,100여 개 매장에서 기다림 없이 바로 픽업할 수 있도록 매장을 선택하세요.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <div className="text-xs">
              <span className="font-bold text-neutral-500">현재 선택된 픽업 매장: </span>
              <span className="font-black text-neutral-900">{currentStore.name}</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-neutral-50 p-4 sm:p-5 rounded-3xl border border-neutral-200 mb-8 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder="지역명, 역세권, 매장명 검색 (예: 강남역, 역삼, 선릉, 홍대, 판교...)"
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-neutral-200 focus:border-[#FDC913] text-sm font-semibold outline-hidden shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-neutral-500 mr-1">매장 편의시설 필터:</span>
            
            <button
              onClick={() => setFilterDT(!filterDT)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                filterDT ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-xs' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>드라이브스루 (DT)</span>
            </button>

            <button
              onClick={() => setFilter24H(!filter24H)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                filter24H ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-xs' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>24시간 영업</span>
            </button>

            <button
              onClick={() => setFilterParking(!filterParking)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                filterParking ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-xs' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>주차 가능 매장</span>
            </button>
          </div>
        </div>

        {/* 2 Column Layout: Left Store Cards, Right Interactive Map Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Stores List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {filteredStores.map((store) => {
              const isSelected = currentStore.id === store.id;
              return (
                <div
                  key={store.id}
                  className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                    isSelected
                      ? 'bg-amber-50/80 border-[#FDC913] shadow-md ring-2 ring-amber-300/40'
                      : 'bg-white border-neutral-200/90 hover:border-neutral-300 shadow-xs'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black px-2 py-0.5 rounded-md bg-neutral-900 text-[#FDC913]">
                        {store.distance}
                      </span>
                      <h3 className="text-base font-black text-neutral-900">{store.name}</h3>
                      {isSelected && (
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          선택중
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {store.address}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        {store.hours}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                        {store.phone}
                      </span>
                    </div>

                    {/* Facility Tags */}
                    <div className="flex items-center gap-1.5 pt-1">
                      {store.hasDT && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                          🚗 DT 전용
                        </span>
                      )}
                      {store.has24H && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-900">
                          🌙 24H 오픈
                        </span>
                      )}
                      {store.hasParking && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-900">
                          🅿️ 주차가능
                        </span>
                      )}
                      {store.hasDelivery && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700">
                          🛵 배달주문
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                    <button
                      onClick={() => onSelectStore(store)}
                      disabled={isSelected}
                      className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-200 text-neutral-500 cursor-default'
                          : 'bg-[#FDC913] hover:bg-yellow-400 text-neutral-950 shadow-xs active:scale-95'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>픽업 매장 선택됨</span>
                        </>
                      ) : (
                        <span>이 매장으로 지정</span>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopyAddress(store)}
                      className="w-full sm:w-auto px-3 py-2 rounded-xl text-[11px] font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
                    >
                      {copiedId === store.id ? '주소 복사 완료!' : '주소 복사'}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Selected Store Detail & Visual Map Card (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-neutral-800 space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-[#FDC913]" />
                <span className="text-xs font-black tracking-wider text-[#FDC913] uppercase">
                  ACTIVE PICKUP STORE
                </span>
              </div>
              <span className="text-xs text-neutral-400">대기 예상 5분</span>
            </div>

            <div>
              <h4 className="text-2xl font-black text-white">{currentStore.name}</h4>
              <p className="text-sm text-neutral-400 mt-1">{currentStore.address}</p>
            </div>

            {/* Stylized Visual Map Representation */}
            <div className="relative h-48 w-full rounded-2xl bg-neutral-800 border border-neutral-700 overflow-hidden flex items-center justify-center">
              {/* Grid map pattern lines */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Simulated Map Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-[#FDC913] text-neutral-950 font-black flex items-center justify-center shadow-2xl border-2 border-white animate-bounce">
                  <MapPin className="w-6 h-6 fill-neutral-950 text-neutral-950" />
                </div>
                <div className="mt-2 bg-neutral-950/90 text-white text-xs font-bold px-3 py-1 rounded-full border border-neutral-700 shadow-md">
                  {currentStore.name}
                </div>
              </div>

              {/* GPS Compass pill */}
              <div className="absolute bottom-3 left-3 bg-neutral-900/90 text-[10px] font-bold text-neutral-300 px-2 py-1 rounded-md border border-neutral-700 flex items-center gap-1">
                <Navigation className="w-3 h-3 text-[#FDC913]" />
                <span>내 위치에서 {currentStore.distance}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex items-center justify-between py-1.5 border-b border-neutral-800">
                <span className="text-neutral-500">운영시간</span>
                <span className="font-bold">{currentStore.hours}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-neutral-800">
                <span className="text-neutral-500">전화번호</span>
                <span className="font-bold text-[#FDC913]">{currentStore.phone}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-neutral-500">포장 및 좌석</span>
                <span className="font-bold">전 메뉴 테이크아웃 & 매장 취식 가능</span>
              </div>
            </div>

            <button
              onClick={() => {
                onNotify?.(`🧭 ${currentStore.name} (${currentStore.distance}) 도보 길안내를 확인하세요!`);
              }}
              className="w-full py-3.5 bg-[#FDC913] hover:bg-yellow-400 text-neutral-950 font-black rounded-2xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>실시간 지도 길찾기 안내</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
