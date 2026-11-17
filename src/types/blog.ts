export interface BlogAuthor {
  name: string;
  avatar: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
  publishedAt: string;
  updatedAt?: string;
  readingTime?: string;
  author: BlogAuthor;
}
