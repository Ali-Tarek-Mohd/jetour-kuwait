import type { Metadata } from "next";
import { Geist, Noto_Sans_Arabic } from "next/font/google";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const geist = Geist({
  variable: "--font-jetour-en",
  subsets: ["latin"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-jetour-ar",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "JETOUR Kuwait",
    template: "%s | JETOUR Kuwait",
  },
  description:
    "Explore JETOUR SUVs, current offers, ownership services and showrooms in Kuwait.",
  applicationName: "JETOUR Kuwait",
  keywords: [
    "JETOUR Kuwait",
    "JETOUR T2",
    "JETOUR G700",
    "SUV Kuwait",
    "JETOUR offers",
  ],
  openGraph: {
    title: "JETOUR Kuwait",
    description:
      "Explore JETOUR SUVs, current offers and ownership services in Kuwait.",
    type: "website",
    locale: "en_KW",
    siteName: "JETOUR Kuwait",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${notoSansArabic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
