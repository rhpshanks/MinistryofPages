import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-amber-600 uppercase tracking-widest">Get In Touch</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-serif">
            Contact Us
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Have a question about our products, a bulk order inquiry, or simply want to share your thoughts? We would love to hear from you.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-lg space-y-8 sm:mt-20">
          <div className="flex gap-x-6 bg-slate-50 p-6 rounded-md ring-1 ring-slate-100">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white shadow-sm ring-1 ring-slate-200">
              <Phone className="h-5 w-5 text-amber-600" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-semibold leading-7 text-slate-900">Phone Support</h3>
              <p className="mt-2 leading-7 text-slate-600">Mon-Fri from 9am to 6pm.</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">+92 319 5015013</p>
            </div>
          </div>
          
          <div className="flex gap-x-6 bg-slate-50 p-6 rounded-md ring-1 ring-slate-100">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white shadow-sm ring-1 ring-slate-200">
              <Mail className="h-5 w-5 text-amber-600" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-semibold leading-7 text-slate-900">Email Support</h3>
              <p className="mt-2 leading-7 text-slate-600">We aim to respond within 24 hours.</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">contactministryofpages@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
