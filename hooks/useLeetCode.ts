import { useState, useEffect } from 'react';
import { LeetCodeGraphQLResponse, SubmissionData, GlobalStats } from '@/types/leetcode';

export function useLeetCode(username: string = '2S4eTOtSDy') {
  const [data, setData] = useState<SubmissionData[]>([]);
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/leetcode?username=${username}`);
        if (!res.ok) throw new Error('Failed to fetch');

        const json: LeetCodeGraphQLResponse = await res.json();

        if (!json.data?.matchedUser?.userCalendar?.submissionCalendar) {
          throw new Error('Invalid data format');
        }

        const calendarStr = json.data.matchedUser.userCalendar.submissionCalendar;
        const calendarMap: Record<string, number> = JSON.parse(calendarStr);

        // Create a full year grid (364 days = 52 weeks * 7 days)
        const today = new Date();
        // Reset to start of day
        today.setHours(0, 0, 0, 0);

        const processedData: SubmissionData[] = [];

        // Go back 364 days
        for (let i = 363; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);

          // Leetcode timestamps are in seconds, timezone might shift things slightly
          // We will find the closest timestamp in the map or just check the day
          const timestampSeconds = Math.floor(date.getTime() / 1000);

          // To be more robust, let's just create a set of all submissions
          let count = 0;

          // Leetcode keys are timestamps in UTC.
          // Check for exact matches or keys within the same day
          const dayStart = timestampSeconds;
          const dayEnd = timestampSeconds + 86400;

          for (const key in calendarMap) {
            const ts = parseInt(key, 10);
            if (ts >= dayStart && ts < dayEnd) {
              count += calendarMap[key];
            }
          }

          let level = 0;
          if (count > 0) level = 1;
          if (count > 2) level = 2;
          if (count > 4) level = 3;
          if (count > 6) level = 4;

          processedData.push({
            date,
            count,
            level
          });
        }

        // Extract Global Stats
        let parsedStats: GlobalStats | null = null;
        if (json.data.matchedUser.submitStatsGlobal) {
          const statsArray = json.data.matchedUser.submitStatsGlobal.acSubmissionNum;
          parsedStats = {
            total: statsArray.find(s => s.difficulty === 'All')?.count || 0,
            easy: statsArray.find(s => s.difficulty === 'Easy')?.count || 0,
            medium: statsArray.find(s => s.difficulty === 'Medium')?.count || 0,
            hard: statsArray.find(s => s.difficulty === 'Hard')?.count || 0,
          };
        }

        if (isMounted) {
          setData(processedData);
          setStats(parsedStats);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    // Auto refresh every 60 seconds
    const intervalId = setInterval(fetchData, 60000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [username]);

  return { data, stats, loading, error };
}
