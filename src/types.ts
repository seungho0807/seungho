export type MenuCategory = 'all' | 'coffee' | 'smoothie' | 'beverage' | 'tea' | 'dessert';

export interface MenuItem {
  id: string;
  name: string;
  engName: string;
  category: MenuCategory;
  price: number;
  isNew?: boolean;
  isBest?: boolean;
  isIceOnly?: boolean;
  isDecafAvailable?: boolean;
  calories: number;
  caffeine: number; // mg
  sugar: number; // g
  desc: string;
  badge?: string;
  colorBg: string;
  imageEmoji: string;
  gradient: string;
  imageUrl?: string;
}

export interface CustomOptions {
  temp: 'ICE' | 'HOT';
  bean: 'regular' | 'decaf';
  shots: number; // 1: 기본, 2: 샷 추가 (+500), 0: 연하게
  sweetness: 'regular' | 'less' | 'stevia' | 'syrup';
  topping: 'none' | 'pearl' | 'icecream';
  iceLevel: 'less' | 'regular' | 'more';
  useTumbler: boolean;
  quantity: number;
}

export interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  options: CustomOptions;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: string;
  hours: string;
  isOpen: boolean;
  hasDT: boolean;
  has24H: boolean;
  hasParking: boolean;
  hasDelivery: boolean;
  lat: number;
  lng: number;
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  desc: string;
  priceTag: string;
  bgGradient: string;
  emoji: string;
  tags: string[];
  imageUrl?: string;
}
