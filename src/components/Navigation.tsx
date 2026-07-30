import { useState } from 'react';
import { Search, ShoppingCart, Menu, Heart, X, LogOut, User, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

interface NavigationProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAuth: (type: 'signin' | 'signup' | 'onboarding') => void;
}

export default function Navigation({ searchQuery, onSearchChange, activeTab, onTabChange, onOpenAuth }: NavigationProps) {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
      'bg-orange-500', 'bg-amber-600', 'bg-emerald-600'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, tab: string) => {
    e.preventDefault();
    onTabChange(tab);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };


  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="#" onClick={(e) => handleTabClick(e, 'main')} className="flex-shrink-0">
              <Logo size={40} variant="light" />
            </a>
            <nav className="hidden lg:ml-6 lg:flex lg:space-x-4 xl:ml-10 xl:space-x-8">
              <a href="#" onClick={(e) => handleTabClick(e, 'main')} className={`${activeTab === 'main' ? 'text-amber-500' : 'text-slate-300 hover:text-white'} px-3 py-2 text-sm font-medium transition-colors`}>Main</a>
              <a href="#" onClick={(e) => handleTabClick(e, 'products')} className={`${activeTab === 'products' ? 'text-amber-500' : 'text-slate-300 hover:text-white'} px-3 py-2 text-sm font-medium transition-colors`}>Products</a>
              <a href="#" onClick={(e) => handleTabClick(e, 'about')} className={`${activeTab === 'about' ? 'text-amber-500' : 'text-slate-300 hover:text-white'} px-3 py-2 text-sm font-medium transition-colors`}>About</a>
              <a href="#" onClick={(e) => handleTabClick(e, 'contact')} className={`${activeTab === 'contact' ? 'text-amber-500' : 'text-slate-300 hover:text-white'} px-3 py-2 text-sm font-medium transition-colors`}>Contact</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4 xl:space-x-6">
            <div className="hidden lg:flex relative w-40 xl:w-60">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search precise pages..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full rounded-md border-0 bg-slate-800 py-1.5 pl-10 pr-3 text-white placeholder:text-slate-400 focus:bg-white focus:text-slate-900 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 transition-all"
              />
            </div>
            
            <div className="flex items-center space-x-4 xl:space-x-6">
              {user ? (
                  /* Profile Dropdown Menu */
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-amber-500 rounded-full"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className={`w-8 h-8 rounded-full ${getAvatarColor(user.user_metadata?.full_name || user.email || '')} flex items-center justify-center text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity`}>
                        {(user.user_metadata?.full_name || user.email || 'M').charAt(0).toUpperCase()}
                      </div>
                    </button>

                    {isProfileDropdownOpen && (
                      <>
                        {/* Overlay backdrop to close dropdown when clicking anywhere else */}
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setIsProfileDropdownOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20 animate-in fade-in duration-100">
                          <div className="px-4 py-2 border-b border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Signed in as</p>
                            <p className="text-xs text-slate-700 font-medium truncate mt-0.5">
                              {user.user_metadata?.full_name || user.email}
                            </p>
                          </div>
                          
                          <button
                            onClick={(e) => handleTabClick(e, 'profile')}
                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <User className="h-4 w-4 text-slate-400" />
                            Profile
                          </button>
                          
                          <button
                            onClick={(e) => handleTabClick(e, 'settings')}
                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <Settings className="h-4 w-4 text-slate-400" />
                            Settings
                          </button>
                          
                          <div className="border-t border-slate-100 my-1" />
                          
                          <button
                            onClick={() => { signOut(); setIsProfileDropdownOpen(false); }}
                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
              ) : (
                <>
                  <button
                    onClick={() => onOpenAuth('signin')}
                    className="hidden lg:block text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="hidden lg:block rounded-sm bg-amber-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-500 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
              
              <div className="h-6 w-px bg-slate-700 hidden lg:block" aria-hidden="true" />
              
              <button 
                className="relative text-slate-300 hover:text-white transition-colors"
                aria-label="Wishlist"
              >
                <span className="sr-only">Items in wishlist</span>
                <Heart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-700 text-[10px] font-bold text-white">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-slate-300 hover:text-white transition-colors"
                aria-label="Cart"
              >
                <span className="sr-only">Items in cart</span>
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-slate-300 hover:text-white transition-colors ml-4">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 border-b">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <div className="mb-4 relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search precise pages..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full rounded-md border-0 bg-slate-800 py-2 pl-10 pr-3 text-white placeholder:text-slate-400 focus:bg-white focus:text-slate-900 sm:text-sm sm:leading-6"
              />
            </div>
            <a href="#" onClick={(e) => handleTabClick(e, 'main')} className={`block rounded-md px-3 py-2 text-base font-medium ${activeTab === 'main' ? 'bg-slate-800 text-amber-500' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>Main</a>
            <a href="#" onClick={(e) => handleTabClick(e, 'products')} className={`block rounded-md px-3 py-2 text-base font-medium ${activeTab === 'products' ? 'bg-slate-800 text-amber-500' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>Products</a>
            <a href="#" onClick={(e) => handleTabClick(e, 'about')} className={`block rounded-md px-3 py-2 text-base font-medium ${activeTab === 'about' ? 'bg-slate-800 text-amber-500' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>About</a>
            <a href="#" onClick={(e) => handleTabClick(e, 'contact')} className={`block rounded-md px-3 py-2 text-base font-medium ${activeTab === 'contact' ? 'bg-slate-800 text-amber-500' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>Contact</a>
            
            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className={`w-8 h-8 rounded-full ${getAvatarColor(user.user_metadata?.full_name || user.email || '')} flex items-center justify-center text-white text-sm font-semibold shadow-sm`}>
                      {(user.user_metadata?.full_name || user.email || 'M').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-medium text-slate-200 truncate mt-0.5">
                        {user.user_metadata?.full_name || user.email}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => handleTabClick(e, 'profile')}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium ${activeTab === 'profile' ? 'bg-slate-800 text-amber-500' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} text-left`}
                  >
                    <User className="h-4 w-4 text-slate-400" />
                    Profile
                  </button>

                  <button
                    onClick={(e) => handleTabClick(e, 'settings')}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium ${activeTab === 'settings' ? 'bg-slate-800 text-amber-500' : 'text-slate-300 hover:bg-slate-800 hover:text-white'} text-left`}
                  >
                    <Settings className="h-4 w-4 text-slate-400" />
                    Settings
                  </button>

                  <button
                    onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-red-400 hover:bg-slate-800 text-left mt-2 border-t border-slate-800/50 pt-3"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { onOpenAuth('signin'); setIsMobileMenuOpen(false); }}
                    className="block rounded-md px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white text-left"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { onOpenAuth('signup'); setIsMobileMenuOpen(false); }}
                    className="block rounded-md px-3 py-2 text-base font-medium text-amber-500 hover:bg-slate-800 text-left"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
