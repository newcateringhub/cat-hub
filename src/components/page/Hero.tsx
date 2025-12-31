import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center bg-background-alt overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[120px]"></div>
      </div>

      <div className="container relative z-10 px-4">
        <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Premium Hospitality Supplies</span>
        <h1 className="text-5xl md:text-7xl mb-8 text-text max-w-4xl mx-auto leading-[1.1]">
          Elegance in Every <span className="italic font-light">Detail.</span>
        </h1>
        <p className="text-lg md:text-xl text-text-light max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Curated collections of world-class catering equipment designed for the most distinguished hotels and restaurants.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/products" className="btn-primary">
            Explore Collection
          </Link>
          <Link href="#categories" className="btn-secondary">
            View Catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}