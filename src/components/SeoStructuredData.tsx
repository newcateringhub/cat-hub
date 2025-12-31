export default function SeoStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Catering Hub",
    "description": "Premium catering utensils for hotels, restaurants, and events.",
    "url": "https://cateringhub.com", // Replace with your final domain
    "telephone": "+919999999999",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop No. 4, opp. Khwahishh hotel, off Ramchandra Lane, Kanchpada",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400064",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "image": "https://cateringhub.com/images/og-image.png" // Replace with your domain
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}