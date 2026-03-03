import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME || 'ethanbwibo-Strath';

    const response = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=15`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'ethan-bwibo-portfolio',
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      return NextResponse.json({ commits: [], username });
    }

    const events = await response.json();

    const commits = events
      .filter((e) => e.type === 'PushEvent')
      .slice(0, 8)
      .flatMap((e) =>
        (e.payload.commits || []).slice(0, 2).map((commit) => ({
          repo: e.repo.name.split('/')[1],
          message: commit.message.split('\n')[0].slice(0, 65),
          date: e.created_at,
          sha: commit.sha?.slice(0, 7),
        }))
      )
      .slice(0, 6);

    return NextResponse.json({ commits, username });
  } catch (error) {
    console.error('GitHub API error:', error.message);
    return NextResponse.json({ commits: [], username: 'ethanbwibo-Strath' });
  }
}
