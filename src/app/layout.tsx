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
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
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
      <body className="relative min-h-screen overflow-x-hidden">
        <CursorProvider>
          {/* Animated Multicolored Background Container */}
          <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-slate-950">
            <div className="absolute -top-[30%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-600/30 blur-[120px] mix-blend-screen animate-blob"></div>
            <div className="absolute top-[20%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-600/30 blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-[40%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-emerald-600/30 blur-[120px] mix-blend-screen animate-blob animation-delay-4000"></div>
          </div>

          {children}
          <GlobalCursor />
        </CursorProvider>
      </body>
    </html>
  );
}