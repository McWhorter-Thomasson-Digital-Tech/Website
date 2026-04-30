import type { Metadata, Viewport } from "next";
import "./globals.css";
import JsonLd from "../components/seo/JsonLd";
import FaqSchema from "../components/seo/FaqSchema";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { GlobalCursor } from "@/components/ui/GlobalCursor";
import { CursorProvider } from "@/lib/CursorContext";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL("https://mtdigitaltech.com"),
  title: {
    template: "%s | MTDT Agency",
    default: "MTDT Agency | High-End Websites & SaaS for Modern Business",
  },
  description: "MTDT Agency architectures high-performance business websites, e-commerce storefronts, and custom SaaS platforms optimized for modern search visibility and conversion.",
  keywords: ["Premium Business Websites", "SaaS Engineering", "E-commerce Development", "Modern Search Visibility", "AEO", "GEO", "MTDT Agency", "Matthew McWhorter", "Graham Thomasson"],
  authors: [{ name: "Matthew McWhorter" }, { name: "Graham Thomasson" }],
  openGraph: {
    title: "MTDT Agency | High-End Websites & SaaS for Modern Business",
    description: "High-performance digital platforms architected for visibility, speed, and conversion.",
    url: "https://mtdigitaltech.com",
    siteName: "McWhorter-Thomasson Digital Technologies",

    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MTDT Agency | Websites & SaaS for Modern Business",
    description: "High-performance business websites, e-commerce storefronts, and custom SaaS platforms.",
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