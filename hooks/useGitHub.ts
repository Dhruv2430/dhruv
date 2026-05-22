import { useEffect, useState } from 'react';
import { GitHubAnalyticsResponse } from '@/types/github';

export function useGitHub(username: string = 'Dhruv2430') {
  const [data, setData] = useState<GitHubAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response = await fetch(`/api/github?username=${username}`);
        if (!response.ok) throw new Error('Failed to fetch GitHub activity');

        const json: GitHubAnalyticsResponse = await response.json();

        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown GitHub error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    fetchData();
    const intervalId = window.setInterval(() => fetchData(true), 60000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [username]);

  return { data, loading, refreshing, error };
}
