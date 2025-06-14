// src/lib/server-db.ts
// This file contains functions that can only be used server-side
// Do not import this in client components

import { Pool } from 'pg';
import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

// For direct PostgreSQL access (server-side only)
let pool: Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return pool;
}

// Create a Supabase client with the user's session for server components
export function createServerSupabaseClient() {
  const headersList = headers();
  
  // Create a cookies object from the headers
  const cookieString = headersList.get('cookie') || '';
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        // Include cookies in the request
        autoRefreshToken: false,
      },
      global: {
        headers: {
          cookie: cookieString,
        },
      }
    }
  );
  
  return supabase;
}

// Example function for a direct SQL query using pg
export async function executeRawQuery(query: string, values: any[] = []) {
  try {
    const pool = getPool();
    const result = await pool.query(query, values);
    return { data: result.rows, error: null };
  } catch (error) {
    console.error('Database query error:', error);
    return { data: null, error };
  }
}
