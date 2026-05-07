import type { Metadata, Viewport } from "next";
import "./globals.css";
import JsonLd from "../components/seo/JsonLd";
import FaqSchema from "../components/seo/FaqSchema";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { GlobalCursor } from "@/components/ui/GlobalCursor";
import { CursorProvider } from "@/lib/CursorContext";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL("https://mtdigitaltech.com"),
  title: {
    template: "%s | MTDT",
    default: "MTDT | Website Development & Design | E-commerce & Software Solutions",
  },
  description: "MTDT architectures high-performance business websites, e-commerce storefronts, and custom software platforms optimized for modern search visibility and conversion.",
  keywords: ["Premium Websites", "Web Design", "Web Development", "Software Solutions", "Software Engineering", "E-commerce Development", "Modern Search Visibility", "AEO", "GEO", "MTDT", "Matthew McWhorter", "Graham Thomasson"],
  authors: [{ name: "Matthew McWhorter" }, { name: "Graham Thomasson" }],
  openGraph: {
    title: "MTDT | Website Development & Design | E-commerce & Software Solutions",
    description: "High-performance premium websites, e-commerce storefronts, and custom software platforms architected for visibility, speed, and conversion.",
    url: "https://mtdigitaltech.com",
    siteName: "McWhorter- Thomasson Digital Technologies",

    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MTDT | Website Development & Design | E-commerce & Software Solutions",
    description: "High-performance premium websites, e-commerce storefronts, and custom software platforms.",
  },
  alternates: {
    canonical: "https://mtdigitaltech.com",
  },
  icons: {
    icon: "/Logo_Clear_Center.png",
    apple: "/Logo_Clear_Center.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#132953" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={cn("dark font-sans", geist.variable)}>
      <head>
        <GoogleAnalytics gaId="AW-18045929417" />
        <JsonLd />
        <FaqSchema />
      </head>
      <body>

        <CursorProvider>
          {children}
          <GlobalCursor />
        </CursorProvider>
      </body>
    </html>
  );
}