import { supabase } from './supabase';

// Types for our database tables
export interface Profile {
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

// Database operations
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function updateUserProfile(userId: string, updates: Partial<Omit<Profile, 'id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function getUserProjects(userId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Project[];
}

export async function getProject(projectId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      datasets (*),
      analyses (*)
    `)
    .eq('id', projectId)
    .single();

  if (error) throw error;
  return data as Project & { datasets: Dataset[], analyses: Analysis[] };
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      ...project,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data as Project;
}

export async function updateProject(projectId: string, updates: Partial<Omit<Project, 'id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from('projects')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', projectId)
    .select()
    .single();

  if (error) throw error;
  return data as Project;
}

export async function deleteProject(projectId: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);

  if (error) throw error;
  return true;
}

export async function uploadDataset(
  projectId: string, 
  file: File, 
  metadata: { name: string, description: string }
) {
  // 1. Upload the file to storage
  const filePath = `datasets/${projectId}/${file.name}`;
  const { data: fileData, error: fileError } = await supabase.storage
    .from('datasets')
    .upload(filePath, file);

  if (fileError) throw fileError;

  // 2. Create database entry
  const { data, error } = await supabase
    .from('datasets')
    .insert({
      name: metadata.name,
      description: metadata.description,
      project_id: projectId,
      file_path: filePath,
      file_size: file.size,
      created_at: new Date().toISOString(),
      columns: {}, // This would be populated after analyzing the file
      row_count: 0, // This would be populated after analyzing the file
    })
    .select()
    .single();

  if (error) throw error;
  return data as Dataset;
}

export async function createAnalysis(analysis: Omit<Analysis, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('analyses')
    .insert({
      ...analysis,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data as Analysis;
}

export async function updateAnalysis(analysisId: string, updates: Partial<Omit<Analysis, 'id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from('analyses')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', analysisId)
    .select()
    .single();

  if (error) throw error;
  return data as Analysis;
}

export async function deleteAnalysis(analysisId: string) {
  const { error } = await supabase
    .from('analyses')
    .delete()
    .eq('id', analysisId);

  if (error) throw error;
  return true;
}

export async function executeQuery(query: string, projectId: string) {
  // This function would execute a SQL query against the dataset
  // In a real implementation, this might involve a backend API call 
  // or direct Supabase RPC call to a stored procedure
  
  // For now, we'll simulate a response
  return {
    columns: ['column1', 'column2', 'column3'],
    rows: [
      { column1: 'value1', column2: 42, column3: true },
      { column1: 'value2', column2: 73, column3: false },
      { column1: 'value3', column2: 28, column3: true },
    ],
  };
}
