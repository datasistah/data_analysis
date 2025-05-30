'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getUserProjects } from '@/lib/database';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Project } from '@/lib/types';

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      
      try {
        const projectData = await getUserProjects(user.id);
        setProjects(projectData);
      } catch (err: any) {
        console.error('Error fetching projects:', err);
        setError(err.message || 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Projects</h1>
          <p className="text-gray-400">Create, manage, and analyze your data projects</p>
        </div>
        <Link href="/projects/new">
          <Button variant="primary" size="lg" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Project
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-800/50 rounded-xl h-64 animate-pulse"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-200">
          <p>Error: {error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-800 mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Create your first data analysis project to get started.
          </p>
          <Link href="/projects/new">
            <Button variant="primary">Create Your First Project</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="h-64 transition-all duration-200 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer overflow-hidden group">
                <div className="h-32 bg-gradient-to-br from-blue-900/30 to-purple-900/30 relative">
                  {project.thumbnail_url ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${project.thumbnail_url})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">{project.name}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
                  <div className="flex items-center mt-3 text-xs text-gray-500">
                    <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{project.is_public ? 'Public' : 'Private'}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          
          <Link href="/projects/new">
            <Card className="h-64 border-dashed border-gray-700 bg-gray-800/30 flex items-center justify-center transition-all duration-200 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 mx-auto flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-300">Create New Project</h3>
              </div>
            </Card>
          </Link>
        </div>
      )}
    </div>
  );
}
