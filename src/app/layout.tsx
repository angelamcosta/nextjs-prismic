import "./globals.css";
import clsx from "clsx";
import { createClient } from "@/prismicio";
import { Nunito, Nunito_Sans } from "next/font/google";
import type { Metadata, ResolvingMetadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || "PrismicTitleFallback",
    description: settings.data.meta_description || "PrismicDescptFallback",
    openGraph: {
      images: [settings.data.og_image.url || "PrismicImageFallback"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(nunito.variable, nunitoSans.variable)}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
