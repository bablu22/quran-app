import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter, Cinzel_Decorative, Amiri } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel-decorative",
});

const noorehuda = localFont({
  src: "./fonts/noorehuda.ttf",
  variable: "--font-noorehuda",
});

const noorehidayat = localFont({
  src: "./fonts/noorehidayat.ttf",
  variable: "--font-noorehidayat",
});

const noorehira = localFont({
  src: "./fonts/noorehira.ttf",
  variable: "--font-noorehira",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "Quran Mazid",
  description:
    "Allah's words, in your language. Read, listen, and explore the Quran with ease. Discover translations, recitations, and insights to deepen your understanding of the divine message. Experience the beauty of the Quran in your native tongue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable, noorehuda.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          inter.variable,
          cinzelDecorative.variable,
          noorehuda.variable,
          noorehidayat.variable,
          noorehira.variable,
          amiri.variable,
          "font-sans antialiased",
        )}
      >
        <NextTopLoader color="#428038" />
        <Header />
        {children}
      </body>
    </html>
  );
}
