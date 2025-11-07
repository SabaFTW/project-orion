export interface EmissionsMap {
  [key: string]: number;
}

export interface Raziskava {
  id: number;
  title: string;
  slug: string;
  category: string;
  location: string;
  ehi: number;
  promise: string;
  reality: string;
  description: string;
  date: string;
  featured: boolean;
  tags: string[];
  lat?: number;
  lon?: number;
  emissions?: EmissionsMap;
  sources?: string[];
  author?: string;
  lastUpdated?: string;
  actions?: string[];
  fileType?: string;
  attachments?: string[];
}
