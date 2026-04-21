export default function SeoStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Store",
        "@id": "https://cateringhub.com/#store",
        "name": "Catering Hub",
        "alternateName": ["Catering Hub Mumbai", "CateringHub"],
        "description": "India's premier supplier of premium catering utensils, chafing dishes, PVD gold tableware, stainless steel chafers, cutlery, risers and hospitality equipment for hotels, restaurants and caterers.",
        "url": "https://cateringhub.com",
        "telephone": "+919136564863",
        "email": "adhiyayan85@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Shop No. 4, opp. Khwahishh hotel, off Ramchandra Lane, Kanchpada",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "postalCode": "400064",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "19.1275",
          "longitude": "72.8370"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "19:00"
          }
        ],
        "priceRange": "$$",
        "servesCuisine": [],
        "hasMap": "https://maps.google.com/?q=Kanchpada+Mumbai+400064",
        "image": "https://cateringhub.com/images/3ltr-pvd-gold-handi-chafer.png",
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "@id": "https://cateringhub.com/#website",
        "url": "https://cateringhub.com",
        "name": "Catering Hub",
        "description": "Premium catering equipment supplier India",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://cateringhub.com/products?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://cateringhub.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Products",
            "item": "https://cateringhub.com/products"
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
