import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "./components/I18nProvider";
import LanguageWrapper from "./components/LanguageWrapper";
import AuthProvider from "./components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopfolio - Your One-Stop Shop",
  description:
    "Modern bilingual e-commerce platform with Arabic and English support",
  keywords: "ecommerce, shopping, arabic, english, bilingual, rtl",
  authors: [{ name: "Shopfolio Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <I18nProvider>
          <LanguageWrapper>
            <AuthProvider>{children}</AuthProvider>
          </LanguageWrapper>
        </I18nProvider>
      </body>
    </html>
  );
}
