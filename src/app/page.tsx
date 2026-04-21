import Hero from "@/components/page/Hero";
import FeaturedCategoryGrid from "@/components/page/FeaturedCategoryGrid";
import CatalogueSection from "@/components/page/CatalogueSection";
import ContactSection from "@/components/page/ContactSection";
import SeoStructuredData from "@/components/SeoStructuredData";

export default function HomePage() {
  return (
    <>
      <SeoStructuredData />
      <Hero />
      <FeaturedCategoryGrid />
      <CatalogueSection />
      <ContactSection />
    </>
  );
}
