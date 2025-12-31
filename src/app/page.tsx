import Hero from "@/components/page/Hero";
import CatalogueSection from "@/components/page/CatalogueSection";
import ContactSection from "@/components/page/ContactSection";
import SeoStructuredData from "@/components/SeoStructuredData";
import FeaturedCategoryGrid from "@/components/page/FeaturedCategoryGrid"; // <-- 1. IMPORT NEW COMPONENT

export default function HomePage() {
  return (
    <>
      <SeoStructuredData />
      <Hero />
      <FeaturedCategoryGrid /> {/* <-- 2. ADD IT HERE */}
      <CatalogueSection />
      <ContactSection />
      {/* 3. The product list is no longer on the homepage */}
    </>
  );
}