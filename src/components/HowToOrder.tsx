// How to Order - Step-by-step buying process guide
import { ShoppingCart, MessageCircle, Wallet, Package } from 'lucide-react';

const steps = [
  {
    icon: ShoppingCart,
    title: 'Browse & Add to Cart',
    description: 'Pick your papers and add them to your cart.',
  },
  {
    icon: MessageCircle,
    title: 'Place Order on WhatsApp',
    description: 'Click "Place Order" — your order details are sent automatically.',
  },
  {
    icon: Wallet,
    title: 'Pay via EasyPaisa',
    description: 'Send payment to +92 300 9100171 and share the screenshot.',
  },
  {
    icon: Package,
    title: 'We Deliver',
    description: 'We pack and ship your order with a tracking number.',
  },
];

export default function HowToOrder() {
  return (
    <section className="bg-white border-t border-b border-slate-200 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-base font-semibold text-amber-600 uppercase tracking-widest">Simple & Secure</h2>
          <p className="mt-2 text-2xl font-serif font-bold text-slate-900 sm:text-3xl">How to Order</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative text-center group">
                {/* Step number */}
                <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 text-white mb-4 group-hover:bg-amber-600 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Connector line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-slate-200" />
                )}

                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Step {index + 1}</p>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[200px] mx-auto">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
