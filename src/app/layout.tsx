import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { portfolioConfig } from "@/config/portfolio.config";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(portfolioConfig.seo.siteUrl),
  title: {
    default: portfolioConfig.seo.title,
    template: `%s | ${portfolioConfig.brand.name}`,
  },
  description: portfolioConfig.seo.description,
  keywords: portfolioConfig.seo.keywords,
  authors: [{ name: portfolioConfig.brand.name, url: portfolioConfig.brand.companyUrl }],
  creator: portfolioConfig.brand.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: portfolioConfig.seo.siteUrl,
    siteName: portfolioConfig.seo.siteName,
    title: portfolioConfig.seo.title,
    description: portfolioConfig.seo.description,
    images: [
      {
        url: portfolioConfig.about.profileImage,
        width: 1200,
        height: 630,
        alt: portfolioConfig.about.profileAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioConfig.seo.title,
    description: portfolioConfig.seo.description,
    images: [portfolioConfig.about.profileImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioConfig.brand.name,
    jobTitle: portfolioConfig.brand.designation,
    url: portfolioConfig.seo.siteUrl,
    email: portfolioConfig.brand.email,
    worksFor: {
      "@type": "Organization",
      name: portfolioConfig.brand.company,
      url: portfolioConfig.brand.companyUrl,
    },
    sameAs: [
      portfolioConfig.brand.socials.github,
      portfolioConfig.brand.socials.linkedin,
      portfolioConfig.brand.socials.instagram,
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preload hero videos so they start playing instantly on page load */}
        <link rel="preload" href="/videos/hero-video.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/videos/hero-video-light.mp4" as="video" type="video/mp4" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <SmoothScrollProvider>
            <div className="noise-overlay" aria-hidden="true" />
            <Preloader />
            <CustomCursor />
            <ScrollProgress />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
