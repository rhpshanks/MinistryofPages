import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <ShoppingBag className="w-12 h-12 mb-4 text-slate-300" />
              <p>Your cart is currently empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-6 text-amber-600 hover:text-amber-700 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-sm overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-slate-900 line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-sm font-medium text-slate-900 ml-4">
                        PKR {(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    
                    <p className="text-xs text-slate-500 mt-1">
                      {item.product.gsm} GSM &middot; {item.product.finish}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center border border-slate-200 rounded-sm bg-white">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium text-slate-900">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-slate-200 p-6 bg-slate-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-600 font-medium">Subtotal</span>
              <span className="text-lg font-bold text-slate-900">PKR {cartTotal.toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Shipping calculated after confirmation on WhatsApp.
            </p>
            <a
              href={`https://wa.me/923195015013?text=${encodeURIComponent(
                `Hi! I'd like to place an order:\n\n` +
                items.map((item, i) => 
                  `${i + 1}. ${item.product.name}\n   SKU: ${item.product.sku}\n   Qty: ${item.quantity} × PKR ${item.product.price.toLocaleString()} = PKR ${(item.product.price * item.quantity).toLocaleString()}`
                ).join('\n\n') +
                `\n\n📦 Total: PKR ${cartTotal.toLocaleString()}\n\nPlease confirm availability and delivery charges.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-3.5 px-4 rounded-sm hover:bg-emerald-500 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Place Order on WhatsApp
            </a>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Order → Confirm on WhatsApp → Pay via EasyPaisa → We deliver 📦
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
