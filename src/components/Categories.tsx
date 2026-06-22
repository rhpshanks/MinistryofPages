import { CATEGORIES } from '../data';
import * as Icons from 'lucide-react';

export default function Categories() {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="sr-only">Product Categories</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
          {CATEGORIES.map((category) => {
            const IconComponent = (Icons as any)[category.icon];
            return (
              <button
                key={category.id}
                className="group relative flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-6 text-center hover:border-amber-500 hover:shadow-sm transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-600 group-hover:bg-amber-50 group-hover:text-amber-600 mb-4 transition-colors">
                  {IconComponent && <IconComponent className="h-6 w-6" />}
                </div>
                <span className="text-sm font-medium text-slate-900">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
