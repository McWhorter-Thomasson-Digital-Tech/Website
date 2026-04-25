import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "../components/seo/JsonLd";
import FaqSchema from "../components/seo/FaqSchema";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { MouseGlow } from "@/components/ui/MouseGlow";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://mtdigitaltech.com"),
  title: {
    template: "%s | MTDT Agency",
    default: "MTDT Agency | High-Velocity Digital Architecture & Engineering",
  },
  description: "MTDT (McWhorter-Thomasson Digital Technologies) engineers high-velocity React ecosystems and immutable backend pipelines for modern innovators and enterprises.",
  keywords: ["Digital Engineering", "React Development", "Backend Automation", "Workflow Optimization", "Software Architecture", "MTDT Agency", "Matthew McWhorter", "Graham Thomasson"],
  authors: [{ name: "Matthew McWhorter" }, { name: "Graham Thomasson" }],
  openGraph: {
    title: "MTDT Agency | We Build Digital Machines",
    description: "High-velocity React ecosystems and immutable backend pipelines engineered for efficiency and scale.",
    url: "https://mtdigitaltech.com",
    siteName: "McWhorter-Thomasson Digital Technologies",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MTDT Agency - Engineering High-Velocity Digital Machines",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MTDT Agency | High-Velocity Engineering",
    description: "Engineering high-velocity React ecosystems and immutable backend pipelines.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://mtdigitaltech.com",
  },
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
        {/* Animated Multicolored Background Container */}
        <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-slate-950">
          <div className="absolute -top-[30%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-600/30 blur-[120px] mix-blend-screen animate-blob"></div>
          <div className="absolute top-[20%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-600/30 blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-[40%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-emerald-600/30 blur-[120px] mix-blend-screen animate-blob animation-delay-4000"></div>
        </div>
        
        {children}
        <MouseGlow />
      </body>
    </html>
  );
}