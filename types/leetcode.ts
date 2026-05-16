export interface GlobalStats {
  total: number;
  easy: number;
  medium: number;
  hard: number;
}

export interface LeetCodeGraphQLResponse {
  data: {
    matchedUser: {
      userCalendar: {
        submissionCalendar: string; // JSON string mapping unix timestamp -> submission count
      };
      submitStatsGlobal?: {
        acSubmissionNum: {
          difficulty: string;
          count: number;
        }[];
      };
    };
  };
}

export interface SubmissionData {
  date: Date;
  count: number;
  level: number; // 0-4 depending on intensity, typical github style
}
