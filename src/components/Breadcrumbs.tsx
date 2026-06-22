import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  return (
    <nav className="flex items-center text-sm font-medium text-slate-500 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Products</a>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
            <span className="text-slate-900" aria-current="page">All Papers</span>
          </div>
        </li>
      </ol>
    </nav>
  );
}
