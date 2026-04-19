import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "../components/seo/JsonLd";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    template: "%s | MTDT Agency",
    default: "[TODO: Insert Default Homepage SEO Title Here]",
  },
  description: "[TODO: Insert Default SEO Meta Description Here]",
  openGraph: {
    title: "[TODO: Insert OG Title Here]",
    description: "[TODO: Insert OG Description Here]",
    url: "https://mtdt.agency", /* Placeholder */
    siteName: "McWhorter-Thomasson Digital Technologies",
    images: [
      {
        url: "https://mtdt.agency/og-image.jpg", /* Placeholder */
        width: 1200,
        height: 630,
        alt: "[TODO: Insert OG Image Alt Text Here]",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // TODO: Add twitter card metadata if desired
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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}