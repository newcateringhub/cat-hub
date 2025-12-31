import { InquiryProvider } from '@/context/InquiryContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'; // 1. IMPORT IT
import './globals.css';

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