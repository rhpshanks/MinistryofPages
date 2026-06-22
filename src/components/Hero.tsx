export default function Hero() {
  return (
    <div className="relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=2000"
          alt="Premium paper flatlay"
          className="h-full w-full object-cover object-center opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-sm">
          Every Page, Perfected
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-slate-300 drop-shadow">
          A commitment to quality that you can feel before the package is even opened. Discover papers crafted for precision, presentation, and permanence.
        </p>
        <div className="mt-10">
          <a
            href="#products"
            className="inline-flex items-center rounded-sm bg-amber-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 transition-colors"
          >
            Browse All Pages
          </a>
        </div>
      </div>
    </div>
  );
}
