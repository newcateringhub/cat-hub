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
    'catering utensils India', 'chafing dishes Mumbai', 'stainless steel chafer', 'PVD gold tableware',
    'hotel catering equipment', 'restaurant utensils supplier', 'catering equipment Mumbai',
    'buffet equipment India', 'catering supplies wholesale', 'hospitality equipment supplier',
    'HoReCa equipment India', 'catering hub Mumbai', 'banquet equipment supplier',
    'food warmer chafer', 'serving dishes catering', 'cutlery supplier India',
    'Raj catering equipment', 'Raj kitchen', 'Arjun catering', 'Vinod cookware alternative',
    'catering utensils online India', 'premium serving equipment', 'wedding catering equipment',
    'event catering supplies Mumbai', 'bulk catering equipment'
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
