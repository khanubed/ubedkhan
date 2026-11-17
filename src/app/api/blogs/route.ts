import { NextResponse } from 'next/server';
import { blogsData } from '@/data/blogs';

export async function GET() {
  const publishedPosts = blogsData.filter((post) => post.published);
  return NextResponse.json({
    success: true,
    data: publishedPosts,
  });
}

// Protected POST endpoint for the future CMS on admin.domainname.com
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_SECRET_KEY;

    if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Valid admin API key required.' },
        { status: 401 }
      );
    }

    const payload = await request.json();
    // In Phase 3, this will execute prisma.blogPost.create({ data: payload })
    return NextResponse.json({
      success: true,
      message: 'Blog post received and queued for publication.',
      data: payload,
    });
  } catch (error) {
    console.error('Blog API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post.' },
      { status: 500 }
    );
  }
}
