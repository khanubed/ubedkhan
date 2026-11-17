import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { blogsData } from '@/data/blogs';
import { getBlogPostSchema } from '@/lib/seo';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogsData.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = getBlogPostSchema(post);

  return (
    <article className="min-h-screen bg-black text-white pt-32 pb-24 px-4 sm:px-8 max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Journal
        </Link>
      </nav>

      <header className="mb-12 border-b border-white/10 pb-8">
        <div className="flex items-center gap-3 text-xs text-indigo-400 mb-4 font-semibold uppercase tracking-wider">
          <span>{post.category}</span>
          <span>•</span>
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          {post.readingTime && (
            <>
              <span>•</span>
              <span className="text-gray-400 normal-case">{post.readingTime}</span>
            </>
          )}
        </div>

        <h1 className="republica text-3xl sm:text-5xl text-white tracking-wide leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-lg text-gray-300 font-light leading-relaxed">
          {post.summary}
        </p>

        {/* Author info */}
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border border-white/20">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{post.author.name}</h3>
            {post.author.bio && (
              <p className="text-xs text-gray-400 font-light">{post.author.bio}</p>
            )}
          </div>
        </div>
      </header>

      {/* Body Content */}
      <div className="prose prose-invert prose-indigo max-w-none text-gray-200 leading-relaxed space-y-6">
        {post.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-xl font-semibold text-gray-100 mt-6 mb-3">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            const listItems = paragraph.split('\n').map((item) => item.replace(/^- /, ''));
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 text-gray-300">
                {listItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={index} className="text-base text-gray-300 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Tags footer */}
      <footer className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-gray-300 font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </footer>
    </article>
  );
}
