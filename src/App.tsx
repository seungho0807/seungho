/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { QuickSmartBar } from './components/QuickSmartBar';
import { MegaBestSection } from './components/MegaBestSection';
import { MenuSection } from './components/MenuSection';
import { StoreFinderSection } from './components/StoreFinderSection';
import { FranchiseSection } from './components/FranchiseSection';
import { OptionModal } from './components/OptionModal';
import { CartDrawer } from './components/CartDrawer';
import { StampModal } from './components/StampModal';
import { FranchiseModal } from './components/FranchiseModal';
import { Footer } from './components/Footer';
import { MENU_ITEMS, STORES_DATA } from './data/mockData';
import { MenuItem, CustomOptions, CartItem, Store } from './types';
import { Check, ArrowUp, ShoppingBag } from 'lucide-react';

export default function App() {
  // Store Selection State
  const [selectedStore, setSelectedStore] = useState<Store>(STORES_DATA[0]);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal States
  const [selectedItemForOption, setSelectedItemForOption] = useState<MenuItem | null>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isStampModalOpen, setIsStampModalOpen] = useState(false);
  const [isFranchiseModalOpen, setIsFranchiseModalOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(['coffee-1', 'smoothie-1']);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('즐겨찾기에서 해제되었습니다.');
        return prev.filter((item) => item !== id);
      } else {
        showToast('❤️ 즐겨찾는 메뉴에 추가되었습니다!');
        return [...prev, id];
      }
    });
  };

  // Open option customizer modal
  const handleOpenOptionModal = (item: MenuItem) => {
    setSelectedItemForOption(item);
    setIsOptionModalOpen(true);
  };

  // Add customized item to cart
  const handleAddToCart = (item: MenuItem, options: CustomOptions) => {
    let unitPrice = item.price;
    if (options.bean === 'decaf') unitPrice += 500;
    if (options.shots === 2) unitPrice += 500;
    if (options.sweetness === 'stevia') unitPrice += 600;
    if (options.sweetness === 'syrup') unitPrice += 500;
    if (options.topping === 'pearl') unitPrice += 700;
    if (options.topping === 'icecream') unitPrice += 800;
    if (options.useTumbler) unitPrice = Math.max(0, unitPrice - 300);

    const cartId = `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newItem: CartItem = {
      cartId,
      menuItem: item,
      options,
      unitPrice,
      totalPrice: unitPrice * options.quantity,
      quantity: options.quantity,
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`🛒 "${item.name}" ${options.quantity}개가 장바구니에 담겼습니다!`);
  };

  // 1-sec quick order for Iced Americano
  const handleQuickOrderIceAmericano = () => {
    const ame = MENU_ITEMS.find((m) => m.id === 'coffee-1') || MENU_ITEMS[0];
    const defaultOptions: CustomOptions = {
      temp: 'ICE',
      bean: 'regular',
      shots: 1,
      sweetness: 'regular',
      topping: 'none',
      iceLevel: 'regular',
      useTumbler: false,
      quantity: 1,
    };
    handleAddToCart(ame, defaultOptions);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              totalPrice: item.unitPrice * nextQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item from cart
  const handleRemoveCartItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
    showToast('장바구니 항목이 삭제되었습니다.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Scroll to section helper
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
  const best4Items = MENU_ITEMS.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-[#FDC913] selection:text-neutral-950 font-sans">
      
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#261814] text-[#FDC913] px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/40 font-black text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Bar */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStamps={() => setIsStampModalOpen(true)}
        selectedStoreName={selectedStore.name}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 1. Hero Promotion Carousel */}
        <HeroSlider
          onOrderClick={() => handleOpenOptionModal(MENU_ITEMS[0])}
          onExploreMenu={() => handleScrollToSection('menu')}
        />

        {/* 2. Quick Smart Order Utility Bar */}
        <QuickSmartBar
          selectedStore={selectedStore}
          onSelectStoreClick={() => handleScrollToSection('store')}
          onOpenStamps={() => setIsStampModalOpen(true)}
          onQuickOrderIceAmericano={handleQuickOrderIceAmericano}
        />

        {/* 3. Real-Time Mega Best TOP 4 */}
        <MegaBestSection
          bestItems={best4Items}
          onSelectItem={handleOpenOptionModal}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* 4. Full Visual Menu Explorer */}
        <MenuSection
          items={MENU_ITEMS}
          onSelectItem={handleOpenOptionModal}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* 5. Mega Store Locator */}
        <StoreFinderSection
          currentStore={selectedStore}
          onSelectStore={(st) => {
            setSelectedStore(st);
            showToast(`📍 픽업 매장이 "${st.name}"으로 변경되었습니다.`);
          }}
          onNotify={showToast}
        />

        {/* 6. Franchise & Startup Guide */}
        <FranchiseSection
          onOpenFranchiseModal={() => setIsFranchiseModalOpen(true)}
        />

      </main>

      {/* Footer */}
      <Footer onNotify={showToast} />

      {/* Floating Action Buttons (Scroll to Top & Mobile Quick Cart) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="md:hidden flex items-center gap-2 bg-[#FDC913] text-neutral-950 font-black px-4 py-3 rounded-full shadow-2xl border-2 border-neutral-950 active:scale-95 transition-all cursor-pointer"
            aria-label="장바구니 열기"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs">{totalCartCount}개 주문하기</span>
          </button>
        )}

        <button
          onClick={handleScrollToTop}
          className="w-11 h-11 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 shadow-md flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
          aria-label="맨 위로 이동"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>

      {/* Interactive Overlays & Modals */}
      <OptionModal
        item={selectedItemForOption}
        isOpen={isOptionModalOpen}
        onClose={() => {
          setIsOptionModalOpen(false);
          setSelectedItemForOption(null);
        }}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        selectedStore={selectedStore}
      />

      <StampModal
        isOpen={isStampModalOpen}
        onClose={() => setIsStampModalOpen(false)}
      />

      <FranchiseModal
        isOpen={isFranchiseModalOpen}
        onClose={() => setIsFranchiseModalOpen(false)}
      />

    </div>
  );
}
