'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProject } from '@/lib/database';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Project, Dataset, Analysis } from '@/lib/types';

interface ProjectWithDetails extends Project {
  datasets: Dataset[];
  analyses: Analysis[];
}

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  const [project, setProject] = useState<ProjectWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'datasets' | 'analyses'>('overview');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject(projectId);
        setProject(projectData);
      } catch (err: any) {
        console.error('Error fetching project:', err);
        setError(err.message || 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="h-8 w-48 bg-gray-800 rounded animate-pulse mb-4"></div>
        <div className="h-12 w-3/4 bg-gray-800 rounded animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="h-64 bg-gray-800 rounded-xl animate-pulse"></div>
          </div>
          <div>
            <div className="h-64 bg-gray-800 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-200">
          <p>Error: {error || 'Project not found'}</p>
          <Link href="/projects" className="text-blue-400 hover:underline mt-2 inline-block">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-4">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to projects
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <div className="flex items-center mb-2">
            <h1 className="text-3xl font-bold mr-3">{project.name}</h1>
            <Badge color={project.is_public ? 'green' : 'blue'}>
              {project.is_public ? 'Public' : 'Private'}
            </Badge>
          </div>
          <p className="text-gray-400">{project.description}</p>
        </div>
        
        <div className="flex mt-4 md:mt-0 space-x-3">
          <Button
            variant="ghost"
            className="inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            Edit
          </Button>
          <Button
            variant="primary"
            className="inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Upload Data
          </Button>
        </div>
      </div>
      
      <div className="border-b border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`
              pb-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'overview' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'}
            `}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`
              pb-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'datasets' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'}
            `}
            onClick={() => setActiveTab('datasets')}
          >
            Datasets ({project.datasets.length})
          </button>
          <button
            className={`
              pb-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'analyses' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'}
            `}
            onClick={() => setActiveTab('analyses')}
          >
            Analyses ({project.analyses.length})
          </button>
        </nav>
      </div>
      
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h2 className="text-xl font-bold mb-4">Project Overview</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Recent Activity</h3>
                  {project.analyses.length > 0 || project.datasets.length > 0 ? (
                    <div className="space-y-3">
                      {project.datasets.slice(0, 3).map((dataset) => (
                        <div key={dataset.id} className="flex items-start">
                          <div className="bg-blue-500/20 p-2 rounded-md mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{dataset.name}</p>
                            <p className="text-xs text-gray-400">
                              Uploaded dataset ({(dataset.file_size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                            <p className="text-xs text-gray-500">{new Date(dataset.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                      
                      {project.analyses.slice(0, 3).map((analysis) => (
                        <div key={analysis.id} className="flex items-start">
                          <div className="bg-purple-500/20 p-2 rounded-md mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{analysis.name}</p>
                            <p className="text-xs text-gray-400">
                              Created {analysis.chart_type} chart
                            </p>
                            <p className="text-xs text-gray-500">{new Date(analysis.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-dashed border-gray-700 rounded-lg">
                      <p className="text-gray-400">No activity yet</p>
                      <p className="text-sm text-gray-500">Upload data to get started</p>
                    </div>
                  )}
                </div>
                
                {/* Quick Actions */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="justify-start"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      Upload Dataset
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      disabled={project.datasets.length === 0}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                      </svg>
                      Run SQL Query
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      disabled={project.datasets.length === 0}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                      </svg>
                      Create Visualization
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      Generate Report
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <h2 className="text-xl font-bold mb-4">Project Info</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-400 mb-1">Created</h3>
                  <p className="text-sm">{new Date(project.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-400 mb-1">Last Updated</h3>
                  <p className="text-sm">{new Date(project.updated_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-400 mb-1">Visibility</h3>
                  <div className="flex items-center">
                    <Badge color={project.is_public ? 'green' : 'blue'} className="mr-2">
                      {project.is_public ? 'Public' : 'Private'}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {project.is_public
                        ? 'Visible to everyone'
                        : 'Only visible to you'}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-400 mb-1">Datasets</h3>
                  <p className="text-sm">{project.datasets.length} datasets</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-400 mb-1">Analyses</h3>
                  <p className="text-sm">{project.analyses.length} analyses</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
      
      {activeTab === 'datasets' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Datasets</h2>
            <Button variant="primary" className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Upload Dataset
            </Button>
          </div>
          
          {project.datasets.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-500 mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
              </svg>
              <p className="text-gray-400 text-lg mb-2">No datasets yet</p>
              <p className="text-gray-500 text-sm mb-4">Upload your first dataset to start analyzing data</p>
              <Button variant="primary">Upload Dataset</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {project.datasets.map((dataset) => (
                <Card
                  key={dataset.id}
                  className="p-4 bg-gray-800/50 border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-500/20 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">{dataset.name}</h3>
                        <p className="text-sm text-gray-400">{dataset.description}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-xs text-gray-500">
                            {(dataset.file_size / 1024 / 1024).toFixed(2)} MB
                          </span>
                          <span className="text-xs text-gray-500">
                            {dataset.row_count.toLocaleString()} rows
                          </span>
                          <span className="text-xs text-gray-500">
                            {Object.keys(dataset.columns).length} columns
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(dataset.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                      <Button variant="ghost" size="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'analyses' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Analyses</h2>
            <Button 
              variant="primary" 
              className="inline-flex items-center"
              disabled={project.datasets.length === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Analysis
            </Button>
          </div>
          
          {project.analyses.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-500 mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
              </svg>
              <p className="text-gray-400 text-lg mb-2">No analyses yet</p>
              <p className="text-gray-500 text-sm mb-4">Create your first analysis to explore your data</p>
              <Button 
                variant="primary"
                disabled={project.datasets.length === 0}
              >
                {project.datasets.length === 0 
                  ? 'Upload data first' 
                  : 'Create Analysis'}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.analyses.map((analysis) => (
                <Card
                  key={analysis.id}
                  className="overflow-hidden bg-gray-800/50 border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                >
                  <div className="h-40 bg-gray-900 flex items-center justify-center">
                    {/* This would display the actual chart in a real implementation */}
                    <div className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-auto mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                      </svg>
                      <p className="text-sm">{analysis.chart_type}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">{analysis.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{analysis.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(analysis.created_at).toLocaleDateString()}
                      </span>
                      <Button variant="ghost" size="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
