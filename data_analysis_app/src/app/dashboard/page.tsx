// src/app/dashboard/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

export default function Dashboard() {
  // This would be fetched from the database in a real implementation
  const recentProjects = [
    { 
      id: 1, 
      name: 'COVID-19 Data Analysis', 
      lastUpdated: '2 days ago',
      progress: 75,
      category: 'Healthcare',
    },
    { 
      id: 2, 
      name: 'Stock Market Trends', 
      lastUpdated: '1 week ago',
      progress: 45,
      category: 'Finance',
    },
    { 
      id: 3, 
      name: 'E-commerce User Behavior', 
      lastUpdated: '2 weeks ago',
      progress: 90,
      category: 'Retail',
    },
  ];
  
  const [activeTab, setActiveTab] = useState('overview');

  // Helper function to render project badges by category
  const getCategoryBadge = (category: string) => {
    switch(category) {
      case 'Healthcare':
        return <Badge variant="success">Healthcare</Badge>;
      case 'Finance':
        return <Badge variant="primary">Finance</Badge>;
      case 'Retail':
        return <Badge variant="secondary">Retail</Badge>;
      default:
        return <Badge variant="default">{category}</Badge>;
    }
  };
  
  return (
    <div className="pt-20 pb-12">
      {/* Demo Notice */}
      <div className="bg-yellow-600/20 border border-yellow-500/50 text-yellow-100 px-4 py-3 mb-6">
        <div className="container mx-auto flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">
            <strong>Demo Mode:</strong> Authentication is temporarily disabled. You can explore all features without signing in.
          </span>
        </div>
      </div>
      
      {/* Header Section with Welcome Message */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
                Welcome to the Demo Platform
              </h1>
              <p className="text-gray-300 mt-1">
                Continue your learning journey and build your portfolio
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link href="/projects/new">
                <Button 
                  variant="primary" 
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  }
                >
                  New Project
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Dashboard Tabs */}
          <div className="flex mt-8 border-b border-gray-700">
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'portfolio'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'learning'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('learning')}
            >
              Learning Path
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card withBorder>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-400">Total Projects</p>
                      <h3 className="text-3xl font-bold mt-1">12</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-xs text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                    <span>Up 25% from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card withBorder>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-400">Completed</p>
                      <h3 className="text-3xl font-bold mt-1">8</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-xs text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                    <span>Up 15% from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card withBorder>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-400">Portfolio Score</p>
                      <h3 className="text-3xl font-bold mt-1">85<span className="text-lg text-gray-400">/100</span></h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-xs text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                    <span>Up 10 points this month</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Projects Section */}
            <Card withBorder>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Projects</CardTitle>
                  <Link href="/projects" className="text-sm text-blue-400 hover:text-blue-300">
                    View all
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-700">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="p-4 hover:bg-gray-750/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Link href={`/projects/${project.id}`} className="font-medium hover:text-blue-400 transition-colors">
                          {project.name}
                        </Link>
                        <div className="flex items-center space-x-2">
                          {getCategoryBadge(project.category)}
                          <span className="text-xs text-gray-400">
                            {project.lastUpdated}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            project.progress >= 80 ? 'bg-green-600' : 
                            project.progress >= 50 ? 'bg-blue-600' : 'bg-yellow-600'
                          }`} 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs">
                        <span className="text-gray-400">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Activity Timeline */}
            <Card withBorder>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative pl-8 pb-6 border-l border-gray-700">
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-600">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="mb-1">
                    <span className="font-medium">SQL Query Created</span>
                    <Badge variant="info" size="sm" className="ml-2">SQL</Badge>
                  </div>
                  <p className="text-sm text-gray-400">
                    Created a complex join query for customer segmentation analysis
                  </p>
                  <span className="block mt-2 text-xs text-gray-500">Today, 9:41 AM</span>
                </div>
                
                <div className="relative pl-8 pb-6 border-l border-gray-700">
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-green-600/20 flex items-center justify-center border border-green-600">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mb-1">
                    <span className="font-medium">Visualization Created</span>
                    <Badge variant="success" size="sm" className="ml-2">Chart</Badge>
                  </div>
                  <p className="text-sm text-gray-400">
                    Created a dashboard for Monthly Revenue Analysis with 4 charts
                  </p>
                  <span className="block mt-2 text-xs text-gray-500">Yesterday, 4:23 PM</span>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-purple-600/20 flex items-center justify-center border border-purple-600">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                  </div>
                  <div className="mb-1">
                    <span className="font-medium">Project Created</span>
                    <Badge variant="secondary" size="sm" className="ml-2">New</Badge>
                  </div>
                  <p className="text-sm text-gray-400">
                    Started a new project on E-commerce User Behavior Analysis
                  </p>
                  <span className="block mt-2 text-xs text-gray-500">2 days ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Skills Progress */}
            <Card withBorder>
              <CardHeader>
                <CardTitle>Skills Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-blue-600/20 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">SQL</span>
                    </div>
                    <span className="text-sm text-gray-400">75%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-green-600/20 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Data Visualization</span>
                    </div>
                    <span className="text-sm text-gray-400">60%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-green-600 to-green-400 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-yellow-600/20 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-yellow-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Statistical Analysis</span>
                    </div>
                    <span className="text-sm text-gray-400">45%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-purple-600/20 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.309 48.309 0 01-8.135-1.087c-1.717-.293-2.3-2.379-1.067-3.61L5 14.5" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Data Cleaning</span>
                    </div>
                    <span className="text-sm text-gray-400">80%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recommended Learning */}
            <Card withBorder>
              <CardHeader>
                <CardTitle>Recommended Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-md bg-blue-600/20 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Advanced SQL for Data Analysis</h4>
                      <p className="text-xs text-gray-400 mt-1">Learn complex joins, window functions, and advanced filtering</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <Badge variant="info" size="sm">Recommended</Badge>
                    <span className="text-xs text-gray-400">25 min</span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-md bg-purple-600/20 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Data Visualization Best Practices</h4>
                      <p className="text-xs text-gray-400 mt-1">Learn how to create effective and insightful charts</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <Badge variant="secondary" size="sm">Popular</Badge>
                    <span className="text-xs text-gray-400">45 min</span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-md bg-green-600/20 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.309 48.309 0 01-8.135-1.087c-1.717-.293-2.3-2.379-1.067-3.61L5 14.5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Data Cleaning Techniques</h4>
                      <p className="text-xs text-gray-400 mt-1">Master effective methods to prepare data for analysis</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <Badge variant="success" size="sm">New</Badge>
                    <span className="text-xs text-gray-400">30 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
