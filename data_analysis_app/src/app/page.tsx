import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="absolute inset-x-0 -bottom-40 bg-gradient-to-t from-gray-900 to-transparent h-40"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <Badge variant="primary" size="lg" className="mb-6">Data Analysis Platform</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
              Learn Data Analysis and Build Your Portfolio
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Master data skills through interactive projects with step-by-step guidance, 
              AI-powered assistance, and build an impressive portfolio to showcase your work.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/signin">
                <Button variant="primary" size="lg" className="px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="px-8">
                  Explore Projects
                </Button>
              </Link>
            </div>
            
            {/* Feature highlight */}
            <div className="mt-16 bg-gray-900/60 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden shadow-2xl p-1">
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg overflow-hidden">
                <div className="px-6 py-8 md:px-10 md:py-10">
                  <h3 className="text-2xl font-semibold mb-6 text-center text-blue-100">
                    AI-Powered Data Analysis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium mb-2">Intelligent SQL Helper</h4>
                      <p className="text-gray-400">Convert natural language to SQL queries with our AI assistant</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium mb-2">Smart Visualizations</h4>
                      <p className="text-gray-400">Create stunning charts with AI-recommended visualization types</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium mb-2">Auto Documentation</h4>
                      <p className="text-gray-400">Automatically document your analysis journey for portfolio building</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Boost Your Data Analysis Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Guided Workflows</h3>
              <p className="text-gray-400 mb-4">Step-by-step instructions for data analysis projects with interactive validation</p>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">SQL Playground</h3>
              <p className="text-gray-400 mb-4">Interactive SQL environment with real-time validation and AI assistance</p>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Data Visualization</h3>
              <p className="text-gray-400 mb-4">Create stunning visualizations with intuitive chart builder and templates</p>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg bg-yellow-600/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Portfolio Builder</h3>
              <p className="text-gray-400 mb-4">Automatically document your analyses and create shareable portfolios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
