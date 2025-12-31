export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-alt border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-heading text-accent tracking-tighter">
            Catering<span className="text-text font-light italic">Hub</span>
          </div>
          
          <div className="flex gap-8 text-xs uppercase tracking-[0.2em] text-text-light">
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-accent transition-colors">Catalogues</a>
          </div>

          <p className="text-[10px] text-text-light uppercase tracking-widest">
            © {currentYear} Catering Hub. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}