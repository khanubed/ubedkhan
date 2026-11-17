import type { Metadata } from 'next';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import MouseFollower from '@/components/common/MouseFollower';
import NavBar from '@/components/layout/NavBar';
import { getPersonSchema, getWebSiteSchema } from '@/lib/seo';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ubedkhan.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ubed Khan | Full-Stack Developer & UI/UX Designer',
    template: '%s | Ubed Khan',
  },
  description:
    'Portfolio of Ubed Khan — Full-Stack Developer specializing in Next.js, React, Node.js, and high-impact typography and motion design.',
  keywords: [
    'Ubed Khan',
    'Full-Stack Developer',
    'Next.js 16 Developer',
    'UI/UX Designer',
    'Frontend Engineer',
    'React Developer India',
    'GSAP Animation Specialist',
    'MERN Stack Developer',
    'Web Development Portfolio',
  ],
  authors: [{ name: 'Ubed Khan', url: siteUrl }],
  creator: 'Ubed Khan',
  publisher: 'Ubed Khan',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Ubed Khan | Full-Stack Developer & UI/UX Designer',
    description:
      'Explore projects, interactive animations, and technical articles by Ubed Khan.',
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
    description: 'Explore projects and creative development work by Ubed Khan.',
    images: ['/images/elements/bitmoji.webp'],
  },
  robots: {
    index: true,
    follow: true,
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
        <SmoothScrollProvider>
          <MouseFollower />
          <NavBar />
          <main id="main-content">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
