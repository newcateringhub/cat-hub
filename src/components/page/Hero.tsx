import Link from 'next/link';

const TICKER_ITEMS = [
  'PVD Gold Chafers', 'SS Tableware', 'Risers & Stands', 'Cutlery Sets',
  'Soup Tureens', 'Platters', 'Bowls', 'Serving Ware', 'Decoratives',
  'HoReCa Range', 'Hotel Supplies', 'Event Equipment'
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-[var(--color-background)] overflow-hidden">
      
      {/* Orb backgrounds */}
      <div className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-[#c9a96e] opacity-[0.03] blur-[100px] pointer-events-none"></div>

      {/* Grid lines decoration */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        opacity: 0.25
      }}></div>

      {/* Main hero content */}
      <div className="flex-1 flex items-center justify-center pt-10 pb-16 px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="w-8 h-px bg-[var(--color-accent)]"></span>
            <span className="label-tag">Mumbai's Premier Catering Equipment Supplier</span>
            <span className="w-8 h-px bg-[var(--color-accent)]"></span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up" style={{ 
            fontSize: 'clamp(3.2rem, 9vw, 8rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            color: 'var(--color-text)',
            animationDelay: '0.2s'
          }}>
            Where<br />
            <em style={{ color: 'var(--color-accent)', fontStyle: 'italic', fontWeight: 300 }}>Elegance</em><br />
            Meets Service.
          </h1>

          {/* Subline */}
          <p className="mt-8 text-base md:text-lg text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed font-light animate-fade-up" style={{ animationDelay: '0.35s' }}>
            Premium catering utensils, chafers, tableware & hospitality equipment trusted by
            top hotels, restaurants and event caterers across India.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Link href="/products" className="btn-primary">
              Explore Collection
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
            <Link href="/#catalogue" className="btn-secondary">
              Download Catalogues
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex items-center justify-center gap-8 md:gap-12 animate-fade-up" style={{ animationDelay: '0.65s' }}>
            {[
              { label: 'Products', value: '30+' },
              { label: 'Categories', value: '9' },
              { label: 'Catalogues', value: '3' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, color: 'var(--color-accent)', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="relative z-10 border-t border-[var(--color-border)] bg-[var(--color-surface)] py-3 overflow-hidden">
        <div className="marquee-track flex items-center gap-0 whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]">{item}</span>
              <span className="w-1 h-1 bg-[var(--color-accent)] rounded-full flex-shrink-0"></span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
