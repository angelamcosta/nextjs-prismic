import "./globals.css";
import clsx from "clsx";
import { createClient } from "@/prismicio";
import { Nunito, Nunito_Sans } from "next/font/google";
import type { Metadata, ResolvingMetadata } from "next";

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

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(): Promise<Metadata> {

  const client = createClient();

  const page = await client.getSingle("settings");

  return {
    title: page.data.site_title || "PrismicTitleFallback",
    description: page.data.meta_description || "PrismicDescptFallback",
    openGraph: {
      images: [page.data.og_image.url || "PrismicImageFallback"],
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(nunito.variable, nunitoSans.variable)}>
      <body>
        <header>Header!</header>
        {children}
        <footer>Footer!</footer>
      </body>
    </html>
  );
}
