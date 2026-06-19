import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BiteSeoul | Curated Global K-Food Recipes",
  description: "Explore the art of Korean cooking with curated recipes, adjustable heat level filters, and step-by-step instructions.",
  keywords: ["Korean food", "K-Food recipes", "BiteSeoul", "Korean cooking", "Korean cuisine", "Bibimbap recipe"],
  authors: [{ name: "BiteSeoul Team" }],
  openGraph: {
    title: "BiteSeoul | Curated Global K-Food Recipes",
    description: "Explore the art of Korean cooking with curated recipes, adjustable heat level filters, and step-by-step instructions.",
    type: "website",
    locale: "en_US",
    siteName: "BiteSeoul",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} dark h-full antialiased`}>
      <body className="font-sans min-h-full bg-brand-bg text-brand-text">
        {children}
      </body>
    </html>
  );
}
