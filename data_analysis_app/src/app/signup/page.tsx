'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';

export default function SignUp() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { success, error } = await signUp(formData.email, formData.password, formData.name);
      
      if (!success && error) {
        setError(error);
        return;
      }
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel with form */}
      <div className="w-full bg-white dark:bg-gray-900 lg:w-1/2 flex items-center justify-center p-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Create your account
            </h1>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Start your data analysis journey today
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md p-4">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70"
              >
                {isLoading ? 'Creating your account...' : 'Sign up'}
              </button>
            </div>

            <div className="text-sm text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right panel with image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-700 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-white">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-6">Transform Raw Data into Insights</h2>
            <p className="text-lg mb-8">
              Learn data analysis, build your portfolio, and showcase your skills with our interactive platform.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white/10 p-2 rounded-md">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-medium">Interactive Visualizations</h3>
                  <p className="mt-1 text-sm text-white/70">Create beautiful charts and graphs from your data</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white/10 p-2 rounded-md">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-medium">SQL Learning</h3>
                  <p className="mt-1 text-sm text-white/70">Practice queries with real-time feedback and AI assistance</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-white/10 p-2 rounded-md">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-medium">Portfolio Builder</h3>
                  <p className="mt-1 text-sm text-white/70">Showcase your projects and analysis skills to employers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
