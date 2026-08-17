import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import StoreProvider from "@/lib/StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" });

export const metadata: Metadata = {
  title: {
    default: "Kishamba Media",
    template: "%s | Kishamba Media",
  },
  description: "Habari za kuaminika, kila siku.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/logo192.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sw">
      <body className={`${inter.variable} ${sourceSerif.variable} font-sans`}>
        <a href="#main-content" className="skip-link">
          Ruka moja kwa moja kwenye maudhui
        </a>
        <StoreProvider>
          <Header />
          <main id="main-content" className="mx-auto min-h-[60vh] max-w-container px-4 py-8">
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
