import { Mail, Phone, MapPin, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span className="text-2xl font-serif font-bold tracking-tight text-slate-900">Ministry of Pages</span>
            <p className="text-sm leading-6 text-slate-600 max-w-xs">
              Providing premium paper products, expertly sourced and carefully delivered to professionals who care about the details.
            </p>
            <div className="flex space-x-6 text-slate-500">
               <MapPin className="h-5 w-5" />
               <span className="text-sm">Storefront / Warehouse Locations</span>
            </div>
            
            <div className="mt-8">
              <h3 className="text-sm font-semibold leading-6 text-slate-900 uppercase tracking-wider mb-2">Stay Informed</h3>
              <p className="text-sm text-slate-600 mb-4">Subscribe for updates on new paper stock arrivals.</p>
              <form className="flex max-w-sm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  type="email"
                  name="email"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-l-md border-0 bg-slate-100 px-3 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-r-md bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-slate-900 uppercase tracking-wider">Shop</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {['Standard Papers', 'Quality Tiers', 'Specialty Papers', 'Sticky Notes'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm leading-6 text-slate-600 hover:text-amber-600 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-slate-900 uppercase tracking-wider">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {['About Us', 'Contact', 'Sustainability', 'B2B Wholesale'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm leading-6 text-slate-600 hover:text-amber-600 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-slate-900 uppercase tracking-wider">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {['Help Center', 'Shipping Policy', 'Returns & Refunds', 'Track Order'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm leading-6 text-slate-600 hover:text-amber-600 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-slate-900 uppercase tracking-wider">Contact</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex items-center text-sm leading-6 text-slate-600">
                    <Phone className="h-4 w-4 mr-3" />
                    +92 319 5015013
                  </li>
                  <li className="flex items-center text-sm leading-6 text-slate-600">
                    <Mail className="h-4 w-4 mr-3" />
                    contact@ministryofpages.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-slate-200 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs leading-5 text-slate-500">
            &copy; {new Date().getFullYear()} Ministry of Pages. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4 text-slate-400">
             <CreditCard className="h-6 w-6" />
             {/* Add actual supported payment method icons here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
