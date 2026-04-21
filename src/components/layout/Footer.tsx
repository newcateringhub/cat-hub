import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 border flex items-center justify-center" style={{ borderColor: 'var(--color-accent)' }}>
                <div className="w-3 h-3" style={{ background: 'var(--color-accent)' }}></div>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 500, color: 'var(--color-text)' }}>
                Catering<span style={{ color: 'var(--color-accent)' }}>Hub</span>
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-light)] font-light leading-relaxed max-w-sm mb-6">
              Mumbai's trusted supplier of premium catering utensils and hospitality equipment for hotels, restaurants, and event caterers.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Kanchpada, Mumbai 400064
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-5" style={{ color: 'var(--color-accent)' }}>
              Quick Links
            </div>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'All Products' },
                { href: '/#categories', label: 'Categories' },
                { href: '/#catalogue', label: 'Catalogues' },
                { href: '/#contact', label: 'Contact Us' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-5" style={{ color: 'var(--color-accent)' }}>
              Categories
            </div>
            <ul className="space-y-3">
              {['Chafers', 'Bowls', 'Cutlery', 'Risers', 'Platters', 'Serving', 'Soupware'].map(cat => (
                <li key={cat}>
                  <Link href={`/products?category=${encodeURIComponent(cat)}`} className="text-sm text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors font-light">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8"></div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider">
            © {year} Catering Hub. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/919136564863"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[#25D366] transition-colors flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Us
            </a>
            <a href="mailto:adhiyayan85@gmail.com" className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
