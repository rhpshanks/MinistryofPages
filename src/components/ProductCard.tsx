import { useState } from 'react';
import { Product } from '../data';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { Star, Eye, ShoppingCart, X, Check, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isPriceDropFormOpen, setIsPriceDropFormOpen] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState('');
  const { addItem } = useCart();
  const { toggleWishlish, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const handleAddToCart = () => {
    addItem(product);
    addToast(`Added ${product.name} to cart`, 'success');
  };

  const handleToggleWishlist = () => {
    toggleWishlish(product.id);
    if (!isInWishlist(product.id)) {
      addToast(`Added ${product.name} to wishlist`, 'success');
    } else {
      addToast(`Removed ${product.name} from wishlist`, 'info');
    }
  };

  const handleNotifyPriceDrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (notificationEmail) {
      addToast(`We'll notify ${notificationEmail} when the price drops`, 'success');
      setIsPriceDropFormOpen(false);
      setNotificationEmail('');
    }
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <>
      <div className="group relative flex flex-col bg-white overflow-hidden rounded-sm border border-slate-200 hover:shadow-md transition-all">
        <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 flex items-center justify-center relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.tier === 'Premium' && (
              <span className="inline-flex items-center rounded-sm bg-slate-900 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-slate-900/10 shadow-sm">
                Premium
              </span>
            )}
            {!product.inStock && (
              <span className="inline-flex items-center rounded-sm bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10 shadow-sm">
                Item not in stock
              </span>
            )}
          </div>

          <button 
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
              inWishlist ? 'bg-amber-50 text-amber-500' : 'bg-white/80 text-slate-400 hover:text-amber-500 hover:bg-white'
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
          
          {/* Quick actions overlay */}
          <div className="absolute opacity-0 group-hover:opacity-100 bottom-3 w-full px-3 flex justify-center transition-opacity">
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsQuickViewOpen(true);
              }}
              className="flex w-full items-center justify-center bg-white/90 backdrop-blur px-4 py-2 text-sm font-medium text-slate-900 hover:bg-white border border-slate-200 rounded shadow-sm"
            >
              <Eye className="w-4 h-4 mr-2 text-slate-500" />
              Quick View
            </button>
          </div>
        </div>
        
        <div className="flex flex-1 flex-col p-5">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-serif font-bold text-slate-900 line-clamp-2 min-h-[40px]">
              {product.name}
            </h3>
          </div>
          
          <div className="mt-2 flex items-center text-xs text-slate-500 space-x-2">
            <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{product.gsm} GSM</span>
            <span>&middot;</span>
            <span>{product.finish}</span>
          </div>
          
          <p className="mt-1 text-xs text-slate-500">{product.packSize}</p>
          
          <div className="mt-3 flex items-center">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="ml-1 text-xs font-medium text-slate-700">{product.rating}</span>
            <span className="ml-1 text-xs text-slate-400">({product.reviews})</span>
          </div>
          
          <div className="mt-6 flex items-center justify-between mt-auto">
            <p className="text-lg font-medium text-slate-900">${product.price.toFixed(2)}</p>
            <button 
              disabled={!product.inStock}
              onClick={handleAddToCart}
              className={`flex items-center justify-center p-2 rounded-sm transition-colors ${
                product.inStock 
                  ? 'bg-slate-900 text-white hover:bg-amber-600' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {isQuickViewOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={() => setIsQuickViewOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-900 bg-white/80 rounded-full backdrop-blur transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-slate-100 flex items-center justify-center relative min-h-[300px]">
               <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
              <div className="mb-4 flex flex-wrap gap-2">
                {product.tier === 'Premium' && (
                  <span className="inline-flex items-center rounded-sm bg-slate-900 px-2 py-1 text-xs font-medium text-white">
                    Premium
                  </span>
                )}
                <span className="inline-flex items-center rounded-sm border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 bg-slate-50">
                  {product.category}
                </span>
                <span className="inline-flex items-center rounded-sm border border-slate-200 px-2 py-1 text-xs font-mono text-slate-500 bg-slate-50 uppercase">
                  SKU: {product.sku}
                </span>
              </div>

              <div className="flex justify-between items-start pr-8">
                <h2 className="text-2xl font-serif font-bold text-slate-900">{product.name}</h2>
                <button 
                  onClick={handleToggleWishlist}
                  className={`mt-1 p-2 rounded-full transition-colors ${
                    inWishlist ? 'bg-amber-50 text-amber-500' : 'bg-slate-100 text-slate-400 hover:text-amber-500'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="mt-4 flex items-center">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="ml-1 text-sm font-medium text-slate-700">{product.rating}</span>
                <span className="ml-1 text-sm text-slate-500">({product.reviews} reviews)</span>
              </div>

              <p className="mt-4 text-3xl font-medium text-slate-900">${product.price.toFixed(2)}</p>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-slate-600">
                    <span className="w-24 font-medium text-slate-900">Weight</span>
                    <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs">{product.gsm} GSM</span>
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <span className="w-24 font-medium text-slate-900">Finish</span>
                    <span>{product.finish}</span>
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <span className="w-24 font-medium text-slate-900">Color</span>
                    <span>{product.color}</span>
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <span className="w-24 font-medium text-slate-900">Pack Size</span>
                    <span>{product.packSize}</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 mt-auto pt-8">
                {product.inStock ? (
                   <div className="flex flex-col gap-3">
                      <p className="text-sm font-medium text-green-700 flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        In Stock and ready to ship
                      </p>
                      <button 
                        onClick={() => {
                          handleAddToCart();
                          setIsQuickViewOpen(false);
                        }}
                        className="w-full flex items-center justify-center rounded-sm bg-amber-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </button>
                   </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium text-red-600">Item not in stock</p>
                    <button 
                      onClick={handleToggleWishlist}
                      className="w-full flex items-center justify-center rounded-sm bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
                    >
                      <Heart className={`w-5 h-5 mr-2 ${inWishlist ? 'fill-current text-white' : ''}`} />
                      {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
                )}
                
                <div className="mt-4">
                  {!isPriceDropFormOpen ? (
                    <button 
                      onClick={() => setIsPriceDropFormOpen(true)}
                      className="text-sm font-medium text-amber-600 hover:text-amber-500 transition-colors underline underline-offset-4"
                    >
                      Notify me of price drop
                    </button>
                  ) : (
                    <form onSubmit={handleNotifyPriceDrop} className="flex gap-2">
                      <input 
                        type="email" 
                        required 
                        placeholder="Your email address" 
                        value={notificationEmail}
                        onChange={(e) => setNotificationEmail(e.target.value)}
                        className="block w-full rounded-sm border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                      />
                      <button 
                        type="submit"
                        className="flex-none rounded-sm bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-200 ring-1 ring-inset ring-slate-300 transition-colors"
                      >
                        Notify
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
