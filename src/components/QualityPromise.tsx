import { Layers, Printer, Droplet, Leaf } from 'lucide-react';

const PILLARS = [
  {
    name: 'Consistent Weight',
    description: 'Uniform thickness across every single sheet, guaranteed by stringent quality control.',
    icon: Layers,
  },
  {
    name: 'Smooth Feed',
    description: 'Engineered precisely to prevent jams and work flawlessly with all major printer brands.',
    icon: Printer,
  },
  {
    name: 'Color Accuracy',
    description: 'Optically optimized pages that resist yellowing and preserve ink fidelity over time.',
    icon: Droplet,
  },
  {
    name: 'Careful Sourcing',
    description: 'Materials chosen with deliberation, balancing premium feel with responsible origins.',
    icon: Leaf,
  },
];

export default function QualityPromise() {
  return (
    <section className="bg-slate-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-white sm:text-4xl">
            Why Our Pages Are Different
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Every ream that leaves our warehouse represents a commitment to the craft of printing and presenting.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <div key={pillar.name} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-amber-500 mb-6">
                <pillar.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{pillar.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed px-4">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
