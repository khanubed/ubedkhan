import type { Metadata, Viewport } from 'next';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import MouseFollower from '@/components/common/MouseFollower';
import NavBar from '@/components/layout/NavBar';
import { FluidBackground } from '@/components/fluid-paint';
import { getPersonSchema, getWebSiteSchema } from '@/lib/seo';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ubed.in';

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ubed Khan | Full-Stack Developer & UI/UX Designer',
    template: '%s | Ubed Khan',
  },
  description:
    'Portfolio of Ubed Khan — Full-Stack Developer & Creative Technologist specializing in Next.js 16, WebGL fluid shaders, React, Node.js, and high-impact typography.',
  keywords: [
    'Ubed Khan',
    'Ubed Khan Developer',
    'Ubed Khan Portfolio',
    'ubed.in',
    'Creative Developer',
    'WebGL Fluid Simulation',
    'Full-Stack Developer',
    'Next.js 16 Developer',
    'UI/UX Designer',
    'Frontend Engineer',
    'React Developer India',
    'GSAP Animation Specialist',
    'MERN Stack Developer',
    'Creative Engineering Portfolio',
  ],
  authors: [{ name: 'Ubed Khan', url: siteUrl }],
  creator: 'Ubed Khan',
  publisher: 'Ubed Khan',
  category: 'technology',
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Ubed Khan | Full-Stack Developer & UI/UX Designer',
    description:
      'Explore projects, WebGL fluid simulations, interactive typography, and technical articles by Ubed Khan.',
    siteName: 'Ubed Khan Portfolio',
    images: [
      {
        url: '/images/elements/bitmoji.webp',
        width: 1200,
        height: 630,
        alt: 'Ubed Khan — Full-Stack Developer & UI/UX Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ubed Khan | Full-Stack Developer & UI/UX Designer',
    description: 'Explore projects and creative engineering work by Ubed Khan.',
    images: ['/images/elements/bitmoji.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/bitmoji.webp',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [getPersonSchema(), getWebSiteSchema()],
  };

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white antialiased selection:bg-indigo-600 selection:text-white">
        {/* Subtle, non-distracting WebGL fluid simulation background */}
        <FluidBackground intensity="subtle" />
        <SmoothScrollProvider>
          <MouseFollower />
          <NavBar />
          <div id="site-wrapper" className="relative z-10">{children}</div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
