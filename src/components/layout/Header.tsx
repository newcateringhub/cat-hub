"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useInquiry } from '@/context/InquiryContext';
import InquiryDrawer from './InquiryDrawer';
import { products, categories } from '@/lib/products';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const { items } = useInquiry();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) { setSearchResults([]); return; }
    const results = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 6);
    setSearchResults(results);
  }, [searchQuery]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/#catalogue', label: 'Catalogues' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="main-header-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-7 h-7 border border-[var(--color-accent)] flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-[var(--color-accent)]"></div>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--color-text)' }}>
              Catering<span style={{ color: 'var(--color-accent)' }}>Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.18em] font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-text-light)] hover:text-[var(--color-text)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(''); }}
                className="p-2.5 text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors"
                aria-label="Search"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-[360px] max-w-[calc(100vw-2rem)] bg-[var(--color-surface)] border border-[var(--color-border-light)] shadow-2xl z-50">
                  <div className="flex items-center gap-3 p-3 border-b border-[var(--color-border)]">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-[var(--color-text-muted)] flex-shrink-0">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search products, categories..."
                      className="flex-1 bg-transparent text-[var(--color-text)] text-sm placeholder:text-[var(--color-text-muted)] outline-none"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                      </button>
                    )}
                  </div>
                  
                  {searchQuery && (
                    <div className="py-2 max-h-[320px] overflow-y-auto">
                      {searchResults.length > 0 ? (
                        <>
                          {searchResults.map(p => (
                            <Link
                              key={p.id}
                              href={`/products/${p.id}`}
                              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--color-surface-raised)] transition-colors group"
                            >
                              <div className="w-9 h-9 bg-[var(--color-background-alt)] flex-shrink-0 overflow-hidden">
                                <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm text-[var(--color-text)] truncate group-hover:text-[var(--color-accent)] transition-colors">{p.name}</div>
                                <div className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider">{p.category}</div>
                              </div>
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                <path d="m9 18 6-6-6-6"/>
                              </svg>
                            </Link>
                          ))}
                          <div className="px-4 pt-2 pb-3 border-t border-[var(--color-border)]">
                            <Link
                              href={`/products?q=${encodeURIComponent(searchQuery)}`}
                              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                              className="text-[11px] text-[var(--color-accent)] uppercase tracking-wider hover:underline"
                            >
                              View all results →
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="px-4 py-6 text-center text-sm text-[var(--color-text-muted)]">No products found</div>
                      )}
                    </div>
                  )}
                  
                  {!searchQuery && (
                    <div className="py-3 px-4">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Browse Categories</div>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                          <Link
                            key={cat}
                            href={`/products?category=${encodeURIComponent(cat)}`}
                            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                            className="text-[11px] px-2.5 py-1 border border-[var(--color-border-light)] text-[var(--color-text-light)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Inquiry Basket */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors"
              aria-label="Open inquiry basket"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-accent)] text-black text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold leading-none">
                  {items.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5 items-end">
                <span className={`block h-px bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`}></span>
                <span className={`block h-px bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 w-5' : 'w-3'}`}></span>
                <span className={`block h-px bg-current transition-all duration-300 ${mobileMenuOpen ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-background-alt)]">
            <div className="px-6 py-6 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-sm text-[var(--color-text-light)] hover:text-[var(--color-accent)] border-b border-[var(--color-border)] last:border-0 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <div className="flex gap-2 flex-wrap">
                  {categories.slice(0,5).map(cat => (
                    <Link
                      key={cat}
                      href={`/products?category=${encodeURIComponent(cat)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[10px] uppercase tracking-wider px-2.5 py-1 border border-[var(--color-border-light)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <InquiryDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
