// About Page

export default function About() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-amber-600 uppercase tracking-widest">Our Story</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-serif">
            Ministry of Pages
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Founded in 2024, Ministry of Pages was born from a simple belief: in an increasingly digital world, the tactile experience of premium paper remains essential. We are a boutique paper merchant dedicated to sourcing and supplying the finest paper products to professionals, artists, and enthusiasts who care deeply about the details.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-xl font-serif font-bold leading-7 text-slate-900">
                Our Vision
              </dt>
              <dd className="mt-2 text-base leading-7 text-slate-600">
                To be the global benchmark for standard and specialty paper goods, preserving the art of analog creation in a digital age. We envision a world where the choice of paper is seen not merely as a practical necessity, but as a fundamental medium of expression.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-xl font-serif font-bold leading-7 text-slate-900">
                Our Mission
              </dt>
              <dd className="mt-2 text-base leading-7 text-slate-600">
                To meticulously curate and sustainably source premium paper collections that elevate everyday documentation, artistic expression, and professional presentation. We strive to provide unparalleled quality and service to those who understand that the medium is part of the message.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
