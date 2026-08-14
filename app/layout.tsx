import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SITE } from "@/lib/content";
import Nav from "./nav";
import Footer from "./footer";
import SmoothScroll from "./smooth-scroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "DevOps Engineer",
    "Site Reliability Engineer",
    "Platform Engineer",
    "Kubernetes",
    "AWS",
    "Terraform",
    "ArgoCD",
    "Node.js",
    "Full-Stack Engineer",
    "Ahmedabad",
    "India",
    "Deep Boda",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    locale: "en_GB",
    images: [
      {
        url: `/og?title=${encodeURIComponent("I run production, and I write the code on it.")}`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    images: [
      `/og?title=${encodeURIComponent("I run production, and I write the code on it.")}`,
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: "Senior DevOps Engineer",
  description: SITE.description,
  address: {
    "@type": "PostalPlace",
    addressLocality: "Ahmedabad",
    addressCountry: "IN",
  },
  sameAs: [SITE.linkedin],
  knowsAbout: [
    "Kubernetes",
    "Amazon Web Services",
    "Terraform",
    "ArgoCD",
    "Docker",
    "CI/CD",
    "Site Reliability Engineering",
    "Node.js",
    "Next.js",
    "PostgreSQL",
    "Redis",
    "Linux",
    "Release Engineering",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
