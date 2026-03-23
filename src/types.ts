export interface PickItem {
  id: string;
  number: number;
  username: string;
  title: string;
  status: string;
  tag: string;
  description: string;
  summary: string;
  whyItMatters: string;
  source: string;
  sourceUrl?: string;
}

export interface AppStats {
  bookmarks: number;
  decisions: number;
  todayTokens: number;
}
