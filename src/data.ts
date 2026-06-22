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
  weights: [70, 75, 80, 90, 100, 120],
  finishes: ['Matte', 'Glossy', 'Satin', 'Uncoated'],
  colors: ['White', 'Ivory', 'Pastel', 'Colored'],
  packSizes: ['Single Ream', 'Box of 5', 'Box of 10', 'Bulk'],
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    sku: 'MOP-A4-80M-WHT',
    name: 'Ministry Standard A4 Ream',
    category: 'A4',
    gsm: 80,
    finish: 'Matte',
    color: 'White',
    packSize: 'Single Ream (500 pages)',
    price: 8.50,
    tier: 'Standard',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: 'p2',
    sku: 'MOP-A4-100S-WHT',
    name: 'Executive Presentation A4',
    category: 'A4',
    gsm: 100,
    finish: 'Satin',
    color: 'White',
    packSize: 'Box of 5',
    price: 45.00,
    tier: 'Premium',
    imageUrl: 'https://images.unsplash.com/photo-1596404179507-62f3daed2d26?auto=format&fit=crop&q=80&w=600',
    rating: 5.0,
    reviews: 89,
    inStock: true,
  },
  {
    id: 'p3',
    sku: 'MOP-A4-70U-WHT',
    name: 'Everyday Draft A4',
    category: 'A4',
    gsm: 70,
    finish: 'Uncoated',
    color: 'White',
    packSize: 'Box of 10',
    price: 70.00,
    tier: 'Economy',
    imageUrl: 'https://images.unsplash.com/photo-1620863830206-8bca20538aeb?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    reviews: 210,
    inStock: true,
  },
  {
    id: 'p4',
    sku: 'MOP-LTR-120M-IVY',
    name: 'Ivory Resume Paper',
    category: 'Letter',
    gsm: 120,
    finish: 'Matte',
    color: 'Ivory',
    packSize: 'Single Ream (250 pages)',
    price: 15.00,
    tier: 'Premium',
    imageUrl: 'https://images.unsplash.com/photo-1603484477859-abe6a73f9366?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviews: 67,
    inStock: true,
  },
  {
    id: 'p5',
    sku: 'MOP-A3-200M-WHT',
    name: 'Heavyweight Matte Photo A3',
    category: 'Specialty',
    gsm: 200,
    finish: 'Matte',
    color: 'White',
    packSize: 'Box of 5 (50 pages total)',
    price: 35.00,
    tier: 'Premium',
    imageUrl: 'https://images.unsplash.com/photo-1583332025134-2eecb0811eef?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviews: 42,
    inStock: false,
  },
  {
    id: 'p6',
    sku: 'MOP-STK-75U-PST',
    name: 'Classic Square Stickies',
    category: 'Sticky Notes',
    gsm: 75,
    finish: 'Uncoated',
    color: 'Pastel',
    packSize: 'Bulk (12 pads)',
    price: 12.00,
    tier: 'Standard',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviews: 315,
    inStock: true,
  }
];
