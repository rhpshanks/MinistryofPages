import { FILTERS } from '../data';
import { Filter, X } from 'lucide-react';

const FILTER_TITLES: Record<string, string> = {
  types: 'Paper Type',
  weights: 'Paper Weight (GSM)',
  finishes: 'Types',
  colors: 'Color',
  packSizes: 'Pack Size'
};

export default function FilterSidebar() {
  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h2>
        <button className="text-sm text-amber-600 hover:text-amber-700 font-medium hidden lg:block">
          Clear All
        </button>
      </div>
      
      <div className="space-y-8 lg:block hidden">
        {Object.entries(FILTERS).map(([key, options]) => (
          <div key={key} className="border-b border-slate-200 pb-6 last:border-0">
            <h3 className="font-medium text-sm text-slate-900 mb-4 uppercase tracking-wider">
              {FILTER_TITLES[key] || key.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <div className="space-y-3">
              {options.map((option, idx) => (
                <div key={idx} className="flex items-center">
                  <input
                    id={`${key}-${idx}`}
                    name={`${key}[]`}
                    defaultValue={option}
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-600"
                  />
                  <label
                    htmlFor={`${key}-${idx}`}
                    className="ml-3 text-sm text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    {option} {key === 'weights' ? 'GSM' : ''}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile filter button */}
      <button className="w-full lg:hidden flex items-center justify-center px-4 py-2 border border-slate-300 rounded-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 mb-6">
        <Filter className="w-4 h-4 mr-2" />
        Filter Products
      </button>
    </div>
  );
}
