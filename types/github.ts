export interface GitHubUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
}

export interface GitHubRepoNode {
  name: string;
  htmlUrl: string;
  description: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  updatedAt: string;
  pushedAt: string | null;
  size: number;
}

export interface GitHubLanguageStat {
  name: string;
  bytes: number;
  percent: number;
  color: string;
}

export interface GitHubActivityDay {
  date: string;
  count: number;
  level: number;
  commits: number;
  pullRequests: number;
  issues: number;
  stars: number;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  publicRepos: number;
  pullRequests: number;
  recentCommits: number;
  currentStreak: number;
  longestStreak: number;
}

export interface GitHubActivityEvent {
  id: string;
  type: string;
  repo: string;
  createdAt: string;
  title: string;
}

export interface GitHubAnalyticsResponse {
  user: GitHubUser;
  repositories: GitHubRepoNode[];
  languages: GitHubLanguageStat[];
  activity: GitHubActivityDay[];
  stats: GitHubStats;
  events: GitHubActivityEvent[];
  fetchedAt: string;
  rateLimitRemaining?: string | null;
}
