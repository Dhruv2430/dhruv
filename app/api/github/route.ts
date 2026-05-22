import { NextResponse } from 'next/server';
import {
  GitHubActivityDay,
  GitHubActivityEvent,
  GitHubAnalyticsResponse,
  GitHubLanguageStat,
  GitHubRepoNode,
} from '@/types/github';

const GITHUB_API = 'https://api.github.com';
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  Java: '#B07219',
  HTML: '#E34C26',
  CSS: '#663399',
  PHP: '#4F5D95',
  'C++': '#F34B7D',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Shell: '#89E051',
  Blade: '#F7523F',
};

interface GitHubRestUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
}

interface GitHubRestRepo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string | null;
  size: number;
  fork: boolean;
}

interface GitHubRestEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: {
    commits?: { sha: string; message: string }[];
    action?: string;
    pull_request?: { title?: string };
    issue?: { title?: string };
  };
}

function githubHeaders() {
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  };
}

async function fetchGitHub<T>(path: string): Promise<{ data: T; remaining: string | null }> {
  const response = await fetch(`${GITHUB_API}${path}`, {
    headers: githubHeaders(),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API responded with status: ${response.status}`);
  }

  return {
    data: await response.json(),
    remaining: response.headers.get('x-ratelimit-remaining'),
  };
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

async function fetchContributionsFromScraper(username: string): Promise<Map<string, { count: number; level: number }>> {
  const url = `https://github.com/users/${username}/contributions`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch public contributions page: ${response.status}`);
  }

  const html = await response.text();
  
  const tdRegex = /<td\s+[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
  const daysMap = new Map<string, { date: string; level: number; count: number }>();
  const idToDate = new Map<string, string>();
  
  let match;
  while ((match = tdRegex.exec(html)) !== null) {
    const tdTag = match[0];
    const dateMatch = tdTag.match(/data-date="([^"]+)"/);
    const levelMatch = tdTag.match(/data-level="([^"]+)"/);
    const idMatch = tdTag.match(/id="([^"]+)"/);
    
    if (dateMatch && levelMatch) {
      const date = dateMatch[1];
      const level = parseInt(levelMatch[1], 10);
      daysMap.set(date, { date, level, count: level > 0 ? level : 0 });
      if (idMatch) {
        idToDate.set(idMatch[1], date);
      }
    }
  }

  const tooltipRegex = /<tool-tip\s+[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
  while ((match = tooltipRegex.exec(html)) !== null) {
    const forId = match[1];
    const text = match[2].trim();
    const date = idToDate.get(forId);
    
    if (date) {
      const countMatch = text.match(/^([0-9]+|No)\s+/);
      let count = 0;
      if (countMatch) {
        if (countMatch[1] !== 'No') {
          count = parseInt(countMatch[1], 10);
        }
      }
      const dayData = daysMap.get(date);
      if (dayData) {
        dayData.count = count;
      }
    }
  }

  const resultMap = new Map<string, { count: number; level: number }>();
  for (const [date, data] of daysMap.entries()) {
    resultMap.set(date, { count: data.count, level: data.level });
  }

  return resultMap;
}

function buildActivity(
  events: GitHubRestEvent[],
  scrapedContributions?: Map<string, { count: number; level: number }> | null
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days: GitHubActivityDay[] = [];
  for (let i = 363; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = toDateKey(date);
    const scraped = scrapedContributions?.get(dateKey);

    days.push({
      date: dateKey,
      count: scraped ? scraped.count : 0,
      level: scraped ? scraped.level : 0,
      commits: 0,
      pullRequests: 0,
      issues: 0,
      stars: 0,
    });
  }

  const byDate = new Map(days.map((day) => [day.date, day]));

  for (const event of events) {
    const day = byDate.get(event.created_at.slice(0, 10));
    if (!day) continue;

    if (event.type === 'PushEvent') {
      const commits = event.payload?.commits?.length || 1;
      day.commits += commits;
      if (!scrapedContributions) {
        day.count += commits;
      }
    } else if (event.type === 'PullRequestEvent') {
      day.pullRequests += 1;
      if (!scrapedContributions) {
        day.count += 2;
      }
    } else if (event.type === 'IssuesEvent') {
      day.issues += 1;
      if (!scrapedContributions) {
        day.count += 1;
      }
    } else if (event.type === 'WatchEvent') {
      day.stars += 1;
      if (!scrapedContributions) {
        day.count += 1;
      }
    } else {
      if (!scrapedContributions) {
        day.count += 1;
      }
    }
  }

  return days.map((day) => {
    const scraped = scrapedContributions?.get(day.date);
    return {
      ...day,
      level: scraped ? scraped.level : (day.count === 0 ? 0 : day.count < 2 ? 1 : day.count < 4 ? 2 : day.count < 8 ? 3 : 4),
    };
  });
}

function calculateStreaks(activity: GitHubActivityDay[]) {
  let longestStreak = 0;
  let running = 0;

  for (const day of activity) {
    if (day.count > 0) {
      running += 1;
      longestStreak = Math.max(longestStreak, running);
    } else {
      running = 0;
    }
  }

  let currentStreak = 0;
  for (let i = activity.length - 1; i >= 0; i--) {
    if (activity[i].count === 0) break;
    currentStreak += 1;
  }

  return { currentStreak, longestStreak };
}

function eventTitle(event: GitHubRestEvent) {
  if (event.type === 'PushEvent') {
    const count = event.payload?.commits?.length || 1;
    return `${count} commit${count === 1 ? '' : 's'} pushed`;
  }

  if (event.type === 'PullRequestEvent') {
    return `${event.payload?.action || 'updated'} PR${event.payload?.pull_request?.title ? `: ${event.payload.pull_request.title}` : ''}`;
  }

  if (event.type === 'IssuesEvent') {
    return `${event.payload?.action || 'updated'} issue${event.payload?.issue?.title ? `: ${event.payload.issue.title}` : ''}`;
  }

  if (event.type === 'WatchEvent') return 'Starred a repository';
  if (event.type === 'CreateEvent') return 'Created a branch or repository';
  return event.type.replace(/Event$/, '');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'Dhruv2430';

  try {
    const [{ data: user, remaining }, { data: repoData }, { data: events }, { data: prSearch }, scrapedContributions] =
      await Promise.all([
        fetchGitHub<GitHubRestUser>(`/users/${username}`),
        fetchGitHub<GitHubRestRepo[]>(`/users/${username}/repos?per_page=100&sort=pushed`),
        fetchGitHub<GitHubRestEvent[]>(`/users/${username}/events/public?per_page=100`),
        fetchGitHub<{ total_count: number }>(
          `/search/issues?q=author:${username}+type:pr&per_page=1`
        ),
        fetchContributionsFromScraper(username).catch((err) => {
          console.error('Failed to scrape contributions:', err);
          return null;
        }),
      ]);

    const sourceRepos = repoData.filter((repo) => !repo.fork);
    const repositories: GitHubRepoNode[] = sourceRepos
      .map((repo) => ({
        name: repo.name,
        htmlUrl: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        language: repo.language,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        size: repo.size,
      }))
      .sort((a, b) => b.stars + b.forks - (a.stars + a.forks));

    const languageRepos = repositories.slice(0, 12);
    const languageResponses = await Promise.allSettled(
      languageRepos.map((repo) =>
        fetchGitHub<Record<string, number>>(`/repos/${username}/${repo.name}/languages`)
      )
    );

    const languageBytes = new Map<string, number>();
    for (const result of languageResponses) {
      if (result.status !== 'fulfilled') continue;
      for (const [language, bytes] of Object.entries(result.value.data)) {
        languageBytes.set(language, (languageBytes.get(language) || 0) + bytes);
      }
    }

    const totalLanguageBytes = Array.from(languageBytes.values()).reduce((sum, bytes) => sum + bytes, 0);
    const languages: GitHubLanguageStat[] = Array.from(languageBytes.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percent: totalLanguageBytes ? Math.round((bytes / totalLanguageBytes) * 1000) / 10 : 0,
        color: LANGUAGE_COLORS[name] || '#6D9886',
      }));

    const activity = buildActivity(events, scrapedContributions);
    const streaks = calculateStreaks(activity);
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stars, 0);
    const totalForks = repositories.reduce((sum, repo) => sum + repo.forks, 0);
    const recentCommits = activity.reduce((sum, day) => sum + day.commits, 0);

    const payload: GitHubAnalyticsResponse = {
      user: {
        login: user.login,
        name: user.name,
        avatarUrl: user.avatar_url,
        htmlUrl: user.html_url,
        publicRepos: user.public_repos,
        followers: user.followers,
      },
      repositories: repositories.slice(0, 18),
      languages,
      activity,
      stats: {
        totalStars,
        totalForks,
        publicRepos: user.public_repos,
        pullRequests: prSearch.total_count,
        recentCommits,
        ...streaks,
      },
      events: events.slice(0, 8).map<GitHubActivityEvent>((event) => ({
        id: event.id,
        type: event.type,
        repo: event.repo.name,
        createdAt: event.created_at,
        title: eventTitle(event),
      })),
      fetchedAt: new Date().toISOString(),
      rateLimitRemaining: remaining,
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
