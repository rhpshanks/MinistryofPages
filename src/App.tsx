/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FilterSidebar from './components/FilterSidebar';
import ProductCard from './components/ProductCard';
import ProductSkeleton from './components/ProductSkeleton';
import QualityPromise from './components/QualityPromise';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ToastContainer from './components/ToastContainer';
import Breadcrumbs from './components/Breadcrumbs';
import About from './components/About';
import Contact from './components/Contact';
import AuthModal from './components/AuthModal';
import AnnouncementBanner from './components/AnnouncementBanner';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { MOCK_PRODUCTS } from './data';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('main');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading on search/filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_PRODUCTS;
    const query = searchQuery.toLowerCase();
    return MOCK_PRODUCTS.filter((product) => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // If selecting products tab, simulate filtering/loading
    if (tab === 'products') {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-slate-50">
            <Navigation 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onOpenAuth={handleOpenAuth}
            />
            <AnnouncementBanner />
            <CartDrawer />
            <ToastContainer />
            <AuthModal 
              isOpen={isAuthOpen} 
              onClose={() => setIsAuthOpen(false)}
              defaultMode={authMode}
            />
            
            <main className="flex-grow">
              {activeTab === 'main' && (
                <>
                  <Hero />
                  <Categories />
                  <Breadcrumbs />
                  <ProductsSection 
                    isLoading={isLoading} 
                    filteredProducts={filteredProducts} 
                    searchQuery={searchQuery} 
                  />
                  <QualityPromise />
                </>
              )}

              {activeTab === 'products' && (
                <>
                  <Breadcrumbs />
                  <ProductsSection 
                    isLoading={isLoading} 
                    filteredProducts={filteredProducts} 
                    searchQuery={searchQuery} 
                  />
                  <QualityPromise />
                </>
              )}

              {activeTab === 'about' && <About />}
              
              {activeTab === 'contact' && <Contact />}
            </main>
            
            <Footer />
          </div>
          <Analytics />
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}

function ProductsSection({ isLoading, filteredProducts, searchQuery }: { isLoading: boolean, filteredProducts: typeof MOCK_PRODUCTS, searchQuery: string }) {
  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <FilterSidebar />
        
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-slate-900">All Products</h2>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <span>Sort by:</span>
              <select className="border-none bg-transparent py-1 pl-1 pr-6 text-slate-900 focus:ring-0 font-medium cursor-pointer">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No products found matching "{searchQuery}".</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
