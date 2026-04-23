import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import styles from "@/app/CSS/Modules/Page.module.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "McWhorter-Thomasson Digital Technologies",
  description: "High Performance Digital Assets for Your Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased`}
      >
        <div className={styles.pageContainer}>
          <Navbar />
          <div className={styles.scrollBox}>
            <main>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}