import { Project } from '@/types/project';
import { BlogPost } from '@/types/blog';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ubed.in';

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Ubed Khan',
    jobTitle: 'Full-Stack Developer & UI/UX Designer',
    url: siteUrl,
    sameAs: [
      'https://github.com/khanubed',
      'https://www.linkedin.com/in/ubed-khan-93220a22a/',
      'https://www.instagram.com/not.ur_ubed/',
    ],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'PostgreSQL',
      'GSAP',
      'WebGL & Shaders',
      'Interactive Fluid Simulation',
      'Creative Development',
      'UI/UX Design',
      'Tailwind CSS',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Full-Stack Developer & Creative Technologist',
      skills: 'Next.js, TypeScript, React 19, WebGL, Node.js, GSAP',
    },
    image: `${siteUrl}/images/elements/bitmoji.webp`,
    email: 'mailto:ubedkhan7529@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      postalCode: '452001',
      addressCountry: 'IN',
    },
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Ubed Khan Portfolio',
    description: 'Portfolio of Ubed Khan — Full-Stack Developer & UI/UX Designer',
    publisher: {
      '@id': `${siteUrl}/#person`,
    },
  };
}

export function getProjectSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    applicationCategory: 'WebApplication',
    operatingSystem: 'All',
    description: project.description,
    author: {
      '@id': `${siteUrl}/#person`,
    },
    url: project.live || project.github || siteUrl,
  };
}

export function getBlogPostSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: siteUrl,
    },
    publisher: {
      '@id': `${siteUrl}/#person`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };
}
