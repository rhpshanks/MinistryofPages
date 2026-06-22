import { useState } from 'react';
import { X, Lock } from 'lucide-react';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-amber-400 border-b border-amber-500 px-4 py-2 sm:px-6 lg:px-8 shadow-sm animate-in fade-in slide-in-from-top duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap md:flex-nowrap gap-2">
        <div className="flex flex-1 items-center justify-center md:justify-start gap-2 text-xs md:text-sm">
          <span className="inline-flex items-center gap-1 rounded bg-amber-950/10 px-2 py-0.5 text-xs font-mono font-bold text-amber-950 border border-amber-950/20 uppercase tracking-wider animate-pulse">
            <Lock className="w-3 h-3" /> Under Seal
          </span>
          <span className="text-center md:text-left font-serif italic text-amber-950 font-semibold tracking-wide">
            A new department of the Ministry is currently being forged. Scribes are whispering of a paper tier so refined, ink behaves differently. Something extraordinary is being pressed...
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-full text-amber-950/70 hover:text-amber-950 hover:bg-amber-950/10 transition-colors cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
