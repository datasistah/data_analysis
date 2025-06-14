'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Try to get the code from the URL
      const { searchParams } = new URL(window.location.href);
      const code = searchParams.get('code');

      if (code) {
        // Exchange the code for a session
        await supabase.auth.exchangeCodeForSession(code);
        
        // Redirect to the dashboard
        router.push('/dashboard');
      } else {
        // No code found, redirect to the sign-in page
        router.push('/signin');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Completing authentication...</h2>
        <p className="text-gray-400">You'll be redirected to your dashboard shortly.</p>
      </div>
    </div>
  );
}
