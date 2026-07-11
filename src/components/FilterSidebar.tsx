import { useState } from 'react';
import { FILTERS } from '../data';
import { Filter } from 'lucide-react';

const FILTER_TITLES: Record<string, string> = {
  types: 'Paper Type',
  weights: 'Paper Weight (GSM)',
  finishes: 'Types',
  colors: 'Color',
  packSizes: 'Pack Size'
};

interface FilterSidebarProps {
  activeFilters: {
    types: string[];
    weights: number[];
    finishes: string[];
    colors: string[];
    packSizes: string[];
  };
  onToggleFilter: (key: string, value: any) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({ activeFilters, onToggleFilter, onClearFilters }: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-serif font-bold text-slate-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h2>
        <button 
          onClick={onClearFilters}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium hidden lg:block"
        >
          Clear All
        </button>
      </div>
      
      <div className={`space-y-8 lg:block ${isMobileOpen ? 'block' : 'hidden'}`}>
        {Object.entries(FILTERS).map(([key, options]) => (
          <div key={key} className="border-b border-slate-200 pb-6 last:border-0">
            <h3 className="font-medium text-sm text-slate-900 mb-4 uppercase tracking-wider">
              {FILTER_TITLES[key] || key.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <div className="space-y-3">
              {options.map((option, idx) => {
                const isChecked = key === 'weights'
                  ? activeFilters.weights.includes(Number(option))
                  : (activeFilters[key as keyof typeof activeFilters] as string[]).includes(String(option));
                
                return (
                  <div key={idx} className="flex items-center">
                    <input
                      id={`${key}-${idx}`}
                      name={`${key}[]`}
                      checked={isChecked}
                      onChange={() => onToggleFilter(key, key === 'weights' ? Number(option) : option)}
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-600 cursor-pointer"
                    />
                    <label
                      htmlFor={`${key}-${idx}`}
                      className="ml-3 text-sm text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      {option} {key === 'weights' ? 'GSM' : ''}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        {isMobileOpen && (
          <button 
            onClick={onClearFilters}
            className="w-full mt-4 lg:hidden flex items-center justify-center px-4 py-2 border border-slate-300 rounded-sm bg-slate-50 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Clear All Filters
          </button>
        )}
      </div>
      
      {/* Mobile filter button */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="w-full lg:hidden flex items-center justify-center px-4 py-2 border border-slate-300 rounded-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 mb-6"
      >
        <Filter className="w-4 h-4 mr-2" />
        {isMobileOpen ? 'Hide Filters' : 'Filter Products'}
      </button>
    </div>
  );
}
