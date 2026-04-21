"use client";

import DownloadButton from '../ui/DownloadButton';

const catalogues = [
  {
    title: "Professional Cookware",
    filename: "304-grade-pots-and-pans.pdf",
    description: "304 Grade Stainless Steel Pots & Pans for commercial kitchens. Heavy-gauge construction for durability.",
    size: "4.5 MB",
    pages: "24 pages",
    badge: "Bestseller"
  },
  {
    title: "Antique Glassware",
    filename: "antique-glassware.pdf",
    description: "Elegant glassware collection curated for fine dining settings, weddings & luxury events.",
    size: "12.4 MB",
    pages: "36 pages",
    badge: "New"
  },
  {
    title: "Digital Crockery",
    filename: "ariane-digital-crockery.pdf",
    description: "Complete Ariane digital crockery and tableware range — HoReCa grade ceramics & melamine.",
    size: "32.6 MB",
    pages: "60 pages",
    badge: "Full Range"
  }
];

export default function CatalogueSection() {
  return (
    <section id="catalogue" className="py-28" style={{ background: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-16">
          <span className="label-tag block mb-4">Resources</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              Digital<br /><em style={{ color: 'var(--color-accent)', fontStyle: 'italic', fontWeight: 300 }}>Catalogues</em>
            </h2>
            <p className="text-sm text-[var(--color-text-light)] max-w-xs leading-relaxed md:text-right font-light">
              Download our comprehensive product catalogues for complete pricing and specifications.
            </p>
          </div>
          <div className="gold-rule mt-8"></div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {catalogues.map((item) => (
            <div
              key={item.filename}
              className="group flex flex-col product-card-glow"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              {/* Top bar */}
              <div className="h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'linear-gradient(90deg, var(--color-accent), transparent)' }}>
              </div>

              <div className="p-8 flex flex-col h-full">
                {/* Badge + Icon row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 flex items-center justify-center"
                    style={{ background: 'var(--color-accent-dim)', border: '1px solid rgba(201,169,110,0.2)' }}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                      style={{ color: 'var(--color-accent)' }}>
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <line x1="10" y1="9" x2="8" y2="9"/>
                    </svg>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 font-semibold"
                    style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', border: '1px solid rgba(201,169,110,0.2)' }}>
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--color-text)' }}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--color-text-light)] font-light leading-relaxed flex-grow mb-8">
                  {item.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 mb-6"
                  style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                      className="text-[var(--color-text-muted)]">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    </svg>
                    <span className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider">{item.pages}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                      className="text-[var(--color-text-muted)]">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider">{item.size}</span>
                  </div>
                </div>

                <DownloadButton catalogName={item.title} fileUrl={`/catalogues/${item.filename}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
