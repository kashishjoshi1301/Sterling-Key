import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Sterling Key Properties | Luxury Real Estate & Institutional Asset Management",
  description: "Where architectural mastery meets unrivaled living. Exclusive estates, visionary developments, and institutional property management inspired by The Agency, Compass, Redfin, Douglas Elliman, and Greystar.",
  keywords: "Sterling Key Properties, luxury real estate, property management, penthouses, Bel-Air estates, Tribeca lofts, Star Island, Mayfair London, Greystar management, Compass search, The Agency RE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF8F5] text-[#1A1D20] antialiased selection:bg-[#C5A880]/30 selection:text-[#0A192F] overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
