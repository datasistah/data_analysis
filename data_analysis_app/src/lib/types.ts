import { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  thumbnail_url?: string;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  project_id: string;
  file_path: string;
  file_size: number;
  created_at: string;
  columns: Record<string, string>; // column name -> data type
  row_count: number;
}

export interface Analysis {
  id: string;
  project_id: string;
  name: string;
  description: string;
  query: string;
  chart_type: string;
  chart_config: any;
  created_at: string;
  updated_at: string;
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, any>[];
}

export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'bubble' | 'radar' | 'polarArea' | 'doughnut';
  options: any;
  data: any;
}
