import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { blogsData } from '@/data/blogs';

export const metadata: Metadata = {
  title: 'Blog & Engineering Notes',
  description:
    'Technical articles, architectural insights, and frontend experiments written by Ubed Khan.',
};

export default function BlogListingPage() {
  const publishedPosts = blogsData.filter((post) => post.published);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-4 sm:px-8 max-w-5xl mx-auto">
      <header className="mb-14">
        <span className="text-xs uppercase font-semibold tracking-widest text-indigo-400">
          Articles & Writing
        </span>
        <h1 className="republica text-4xl sm:text-6xl text-white tracking-wider mt-2 mb-4">
          ENGINEERING JOURNAL
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl font-light">
          Thoughts on full-stack architecture, typography, micro-interactions, performance optimization, and developer tooling.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {publishedPosts.map((post) => (
          <article
            key={post.id}
            className="group relative flex flex-col justify-between p-6 sm:p-8 bg-zinc-950 border border-white/10 hover:border-white/30 rounded-3xl transition-all duration-300 hover:-translate-y-1 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
          >
            <div>
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-gray-200 font-medium">
                  {post.category}
                </span>
                <span>•</span>
                <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-3 leading-snug">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                {post.summary}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-gray-400 font-mono bg-white/5 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-5">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-indigo-400 transition-colors"
                >
                  Read Article
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
