import { InquiryProvider } from '@/context/InquiryContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://cateringhub.com'),
  title: {
    default: 'Catering Hub | Premium Catering Utensils & Hospitality Equipment India',
    template: '%s | Catering Hub'
  },
  description: 'India\'s leading supplier of premium catering utensils, chafing dishes, stainless steel chafers, PVD gold tableware, cutlery, bowls, risers & hospitality equipment. Trusted by top hotels, restaurants & caterers across Mumbai and India.',
  keywords: [
  // Core business
  "catering equipment",
  "catering utensils",
  "catering supplies",
  "hospitality equipment",
  "hotel equipment",
  "restaurant equipment",
  "banquet equipment",

  // Location-based
  "catering equipment Mumbai",
  "catering utensils Mumbai",
  "catering supplies Mumbai",
  "hospitality equipment Mumbai",
  "catering equipment India",
  "catering utensils India",

  // Product keywords
  "chafing dishes",
  "food warmers",
  "buffet equipment",
  "serving utensils",
  "serving dishes",
  "stainless steel chafer",
  "gold chafing dish",
  "PVD gold tableware",
  "buffet stands",
  "serving bowls",
  "serving platters",
  "soup tureens",
  "food display stands",
  "catering cutlery",
  "serving ladles",

  // Industry terms
  "HoReCa equipment",
  "commercial catering equipment",
  "hotel buffet equipment",
  "restaurant serving equipment",
  "wedding catering equipment",
  "event catering supplies",
  "banquet serving equipment",
  "premium catering products",

  // Purchase intent
  "buy catering equipment",
  "catering equipment supplier",
  "catering equipment wholesaler",
  "bulk catering equipment",
  "catering equipment manufacturer",
  "catering equipment distributor",

  // Competitor searches
  "Raj catering equipment",
  "Raj kitchen",
  "Arjun catering",
  "Vinod cookware alternative",

  // Brand
  "New Catering Hub",
  "Catering Hub Mumbai",
  "newcateringhub",
],
  authors: [{ name: 'Catering Hub' }],
  creator: 'Catering Hub',
  publisher: 'Catering Hub',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: 'Catering Hub | Premium Catering Utensils & Hospitality Equipment',
    description: 'Explore our curated collection of premium catering equipment — PVD gold chafers, stainless steel tableware, cutlery, risers & more. Trusted by top hotels across India.',
    url: 'https://cateringhub.com',
    siteName: 'Catering Hub',
    images: [{ url: '/images/3ltr-pvd-gold-handi-chafer.png', width: 1200, height: 630, alt: 'Catering Hub Premium Equipment' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catering Hub | Premium Hospitality Equipment India',
    description: 'PVD gold chafers, stainless steel tableware, cutlery & more. Trusted by top hotels & caterers.',
    images: ['/images/3ltr-pvd-gold-handi-chafer.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://cateringhub.com' },
  verification: { google: 'your-google-verification-code' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <InquiryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </InquiryProvider>
      </body>
    </html>
  );
}
