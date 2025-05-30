'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { createProject } from '@/lib/database';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function NewProjectPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_public: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const projectData = await createProject({
        name: formData.name,
        description: formData.description,
        user_id: user.id,
        is_public: formData.is_public,
      });
      
      router.push(`/projects/${projectData.id}`);
    } catch (err: any) {
      console.error('Error creating project:', err);
      setError(err.message || 'Failed to create project');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link 
        href="/projects" 
        className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to projects
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
        <p className="text-gray-400">Set up your data analysis project</p>
      </div>
      
      <Card className="p-6 bg-gray-800/50 border-gray-700">
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Project Name<span className="text-red-400">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="My Data Analysis Project"
              fullWidth
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Description<span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what your project is about..."
              rows={4}
              className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-500"
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_public"
              name="is_public"
              checked={formData.is_public}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_public" className="ml-2 text-sm text-gray-300">
              Make project public
            </label>
            <Badge color="blue" className="ml-2">
              {formData.is_public ? 'Public' : 'Private'}
            </Badge>
          </div>
          
          <div className="pt-4 border-t border-gray-700">
            <div className="flex justify-end space-x-4">
              <Link href="/projects">
                <Button type="button" variant="ghost" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
