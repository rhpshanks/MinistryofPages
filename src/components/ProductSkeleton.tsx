export default function ProductSkeleton() {
  return (
    <div className="group relative flex flex-col bg-white overflow-hidden rounded-sm ring-1 ring-slate-200 shadow-sm animate-pulse">
      <div className="aspect-[4/5] bg-slate-200 sm:aspect-square w-full" />
      
      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 w-16 bg-slate-200 rounded-sm" />
          <div className="h-6 w-24 bg-slate-200 rounded-sm" />
        </div>

        <div className="h-8 w-3/4 bg-slate-200 rounded-sm mb-4" />
        
        <div className="h-4 w-1/4 bg-slate-200 rounded-sm mb-8" />
        
        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="h-6 w-16 bg-slate-200 rounded-sm" />
          <div className="h-10 w-10 bg-slate-200 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
