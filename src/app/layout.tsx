import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "../components/seo/JsonLd";
import FaqSchema from "../components/seo/FaqSchema";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

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
      <body>
        {children}
      </body>
    </html>
  );
}