// src/app/api/query/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { executeRawQuery } from '@/lib/server-db';
import { createServerSupabaseClient } from '@/lib/server-db';

export async function POST(request: NextRequest) {
  try {
    // TEMPORARILY DISABLED FOR DEMO - REMOVE WHEN RE-ENABLING AUTH
    // Check if the user is authenticated
    // const supabase = createServerSupabaseClient();
    // const { data: { session } } = await supabase.auth.getSession();

    // if (!session) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    // Parse the request body
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid query' },
        { status: 400 }
      );
    }

    // Add safety checks here
    // For example, prevent certain destructive SQL commands
    const forbiddenCommands = [
      /DROP\s+TABLE/i,
      /DROP\s+DATABASE/i,
      /DELETE\s+FROM/i,
      /UPDATE\s+.*\s+SET/i,
      /ALTER\s+TABLE/i,
      /TRUNCATE/i,
      /INSERT\s+INTO/i,
    ];

    const isReadOnly = !forbiddenCommands.some(pattern => pattern.test(query));

    if (!isReadOnly) {
      return NextResponse.json(
        { error: 'Only SELECT queries are allowed' },
        { status: 403 }
      );
    }

    // Execute the query
    const { data, error } = await executeRawQuery(query);

    if (error) {
      console.error('SQL query execution error:', error);
      return NextResponse.json(
        { error: error.message || 'Error executing query' },
        { status: 500 }
      );
    }

    // Return the result
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
