export type QualityTier = 'Economy' | 'Standard' | 'Premium' | 'Archival';
export type PaperFinish = 'Matte' | 'Glossy' | 'Satin' | 'Uncoated';
export type PaperColor = 'White' | 'Ivory' | 'Pastel' | 'Colored';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  gsm: number;
  finish: PaperFinish;
  color: PaperColor;
  packSize: string;
  price: number;
  tier: QualityTier;
  imageUrl: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export const CATEGORIES = [
  { id: 'standard', name: 'Standard Papers', icon: 'FileText' },
  { id: 'quality', name: 'Quality Tiers', icon: 'Award' },
  { id: 'specialty', name: 'Specialty Papers', icon: 'Sparkles' },
  { id: 'sticky', name: 'Sticky Notes', icon: 'StickyNote' },
];

export const FILTERS = {
  types: ['A4', 'A3', 'A5', 'Legal', 'Letter', 'Sticky Notes', 'Specialty'],
  weights: [70, 75, 80, 90, 100, 120, 180, 200, 300],
  finishes: ['Matte', 'Glossy', 'Satin', 'Uncoated'],
  colors: ['White', 'Ivory', 'Pastel', 'Colored'],
  packSizes: ['Ream', 'Box of 5', 'Box of 10', 'Bulk'],
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'mp-1',
    sku: 'MP-A4-80U-WHT-DBLA',
    name: 'Double A A4 Copy Paper — Ream, 500 Sheets',
    category: 'A4',
    gsm: 80,
    finish: 'Uncoated',
    color: 'White',
    packSize: 'Ream - 500 sheets',
    price: 1400,
    tier: 'Standard',
    imageUrl: '/products/double-a-80gsm.png',
    rating: 0,
    reviews: 0,
    inStock: true,
  },
  {
    id: 'mp-2',
    sku: 'MP-A4-180G-WHT',
    name: 'Glossy Photo Paper — Everyday Prints, 180 GSM',
    category: 'A4',
    gsm: 180,
    finish: 'Glossy',
    color: 'White',
    packSize: '50 Sheets',
    price: 600,
    tier: 'Standard',
    imageUrl: '/products/glossy-180gsm.jpg',
    rating: 0,
    reviews: 0,
    inStock: true,
  },
  {
    id: 'mp-3',
    sku: 'MP-A4-200G-WHT',
    name: 'Glossy Photo Paper — Quality Prints, 200 GSM',
    category: 'A4',
    gsm: 200,
    finish: 'Glossy',
    color: 'White',
    packSize: '50 Sheets',
    price: 900,
    tier: 'Premium',
    imageUrl: '/products/glossy-200gsm.jpg',
    rating: 0,
    reviews: 0,
    inStock: true,
  },
  {
    id: 'mps-4',
    sku: 'MP-A4-300G-WHT',
    name: 'Premium Glossy Photo Paper — 300 GSM',
    category: 'A4',
    gsm: 300,
    finish: 'Glossy',
    color: 'White',
    packSize: '50 Sheets',
    price: 1700,
    tier: 'Premium',
    imageUrl: '/products/glossy-300gsm.jpg',
    rating: 0,
    reviews: 0,
    inStock: true,
  },
];
