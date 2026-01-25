import { InquiryProvider } from '@/context/InquiryContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'; // 1. IMPORT IT
import './globals.css';
export const metadata = {
  title: 'Catering Hub | Premium Hospitality & Kitchen Equipment',
  description: 'India’s leading supplier of high-end catering equipment, from designer chafers to premium cutlery. Quality trusted by top hotels.',
  openGraph: {
    title: 'Catering Hub | Premium Hospitality Equipment',
    description: 'Explore our curated collections of premium catering gear. Inquire via WhatsApp for instant quotes.',
    url: 'https://your-domain.com', // Replace with your actual live URL
    siteName: 'Catering Hub',
    images: [
      {
        url: '/images/og-image.jpg', // Place a nice photo of the showroom or logo here
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <InquiryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          
          {/* 2. PLACE IT HERE (Before the closing tag) */}
          <FloatingWhatsApp />
          
        </InquiryProvider>
      </body>
    </html>
  );
}