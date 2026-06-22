import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data';

interface WishlistContextType {
  wishlistItems: string[];
  toggleWishlish: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const toggleWishlish = (productId: string) => {
    setWishlistItems(current => {
      if (current.includes(productId)) {
        return current.filter(id => id !== productId);
      }
      return [...current, productId];
    });
  };

  const isInWishlist = (productId: string) => wishlistItems.includes(productId);
  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlish, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
