"use client";

const catalogues = [
  {
    title: "Professional Cookware",
    filename: "304-grade-pots-and-pans.pdf",
    description: "304 Grade Stainless Steel Pots & Pans for commercial kitchens.",
    size: "4.5 MB"
  },
  {
    title: "Antique Glassware",
    filename: "antique-glassware.pdf",
    description: "Elegant glassware collection for fine dining and events.",
    size: "12.4 MB"
  },
  {
    title: "Digital Crockery",
    filename: "ariane-digital-crockery.pdf",
    description: "Complete Ariane digital crockery and tableware range.",
    size: "32.6 MB"
  }
];

export default function CatalogueSection() {
  return (
    <section id="catalogue" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Resources</span>
          <h2 className="text-4xl font-heading text-text">Our Digital Catalogues</h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {catalogues.map((item) => (
            <div key={item.filename} className="bg-background-alt border border-border p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-accent/5 flex items-center justify-center rounded-full mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              
              <h3 className="text-xl font-heading mb-3">{item.title}</h3>
              <p className="text-sm text-text-light font-light mb-8 flex-grow">
                {item.description}
              </p>
              
              {/* THE PATH: /catalogues/filename.pdf points to public/catalogues/ */}
              <a 
                href={`/catalogues/${item.filename}`} 
                download 
                className="btn-secondary w-full py-3 text-[10px]"
              >
                Download PDF ({item.size})
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}