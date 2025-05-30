// src/components/data/ChartContainer.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface ChartContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  type?: 'line' | 'bar' | 'pie' | 'scatter' | 'custom';
  fullscreen?: boolean;
  className?: string;
  actions?: React.ReactNode;
  isLoading?: boolean;
}

export function ChartContainer({
  title,
  description,
  children,
  type = 'custom',
  fullscreen = false,
  className = '',
  actions,
  isLoading = false,
}: ChartContainerProps) {
  const [isFullscreen, setIsFullscreen] = useState(fullscreen);
  
  const getBadgeColor = () => {
    switch (type) {
      case 'line':
        return 'primary';
      case 'bar':
        return 'secondary';
      case 'pie':
        return 'success';
      case 'scatter':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-4 z-50 bg-gray-900/95 backdrop-blur-lg h-auto' 
          : ''
      } ${className}`}
      withBorder
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle>{title}</CardTitle>
            <Badge variant={getBadgeColor()} size="sm">{type}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            {actions}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 hover:bg-gray-700 rounded-md transition-colors"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M15 9V4.5M15 9H19.5M9 15v4.5M9 15H4.5M15 15v4.5M15 15H19.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m9 0v4.5m0-4.5h4.5m0 9v4.5m0-4.5h-4.5m-9 0v4.5m0-4.5H3.75" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className={`w-full ${isFullscreen ? 'h-[calc(100vh-180px)]' : 'h-64'}`}>
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
