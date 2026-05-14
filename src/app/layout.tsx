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
    // Highlight React/Next.js and your location in the default title
    default: "MTDT | React & Next.js Web Development Agency in Lynchburg, VA",
  },
  // Add specific mentions of React, Next.js, and custom apps
  description: "Based in Lynchburg, VA, MTDT architectures high-performance React & Next.js web apps, custom software platforms, and e-commerce storefronts optimized for modern search visibility.",
  keywords: [
    "React Developers Lynchburg", 
    "Next.js Agency Virginia", 
    "Custom App Development Lynchburg",
    "Premium Websites", 
    "Software Engineering", 
    "E-commerce Development", 
    "AEO", 
    "GEO", 
    "MTDT", 
    "Matthew McWhorter", 
    "Graham Thomasson",
    "Custom full-stack web development agency",
    "React and Next.js development company",
    "TypeScript software developers for hire",
    "High-performance custom website development",
    "SaaS application development agency",
    "B2B custom dashboard development",
    "Custom web app development services",
    "React front-end development company",
    "Enterprise software development firm",
    "Custom MVP development for startups",
    "Dark mode UI/UX design agency",
    "High-contrast web application design",
    "Sleek technical dashboard UI/UX",
    "Tactical UI design for software tools",
    "Modern web application design",
    "Custom UI/UX for SaaS platforms",
    "Developer-focused clean web design",
    "Custom e-commerce website development",
    "Headless e-commerce development agency",
    "Next.js e-commerce storefronts",
    "High-converting e-commerce UI design",
    "Custom shopping cart development",
    "B2B e-commerce platform development",
    "E-commerce migration to Next.js",
    "Fastest loading e-commerce websites",
    "Custom Shopify Plus headless development",
    "Premium digital technology agency",
    "Modern tech stack web agency",
    "Custom digital product development",
    "Scalable web application architecture",
    "Website design",
    "Web development",
    "Software development",
    "E-commerce development",
    "UX design",
    "UI design",
    "Web designer",
    "App development",
    "Custom software",
    "Web agency",
    "Digital agency",
    "Coding services",
    "Full stack development",
    "Front end development",
    "Back end development",
    "Online store builder",
    "Website creator",
    "Mobile app development",
    "SaaS development",
    "E-commerce solutions",
    "web design lynchburg va",
    "web development lynchburg va",
    "web development lynchburg virginia",
    "software developer lynchburg va",
    "software companies lynchburg va"
  ],
  authors: [{ name: "Matthew McWhorter" }, { name: "Graham Thomasson" }],
  openGraph: {
    title: "MTDT | React & Next.js Software Agency in Lynchburg, VA",
    description: "High-performance premium websites, e-commerce storefronts, and custom software platforms architected for visibility, speed, and conversion.",
    url: "https://mtdigitaltech.com",
    siteName: "McWhorter-Thomasson Digital Technologies",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MTDT | React & Next.js Web Development | Lynchburg, VA",
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