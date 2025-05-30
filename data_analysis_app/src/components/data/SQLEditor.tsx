// src/components/data/SQLEditor.tsx
'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

// Dynamic import to prevent server-side rendering issues
const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false }
);

interface SQLEditorProps {
  initialQuery?: string;
  onRun?: (query: string) => void;
  isLoading?: boolean;
  editorHeight?: string;
  suggestions?: boolean;
}

export function SQLEditor({
  initialQuery = 'SELECT * FROM customers\nWHERE created_at > NOW() - INTERVAL \'30 days\'',
  onRun,
  isLoading = false,
  editorHeight = 'h-64',
  suggestions = true,
}: SQLEditorProps) {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  // Mock SQL suggestions
  const sqlSuggestions = [
    'SELECT * FROM',
    'WHERE',
    'GROUP BY',
    'ORDER BY',
    'INNER JOIN',
    'LEFT JOIN',
    'HAVING',
    'LIMIT'
  ];
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Show suggestions on Ctrl+Space
    if (e.key === ' ' && e.ctrlKey) {
      e.preventDefault();
      setShowSuggestions(true);
      return;
    }
    
    if (showSuggestions) {
      // Navigate through suggestions with arrow keys
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion((prev) => 
          prev < sqlSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion((prev) => prev > 0 ? prev - 1 : 0);
      } 
      // Select suggestion with Enter or Tab
      else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        applySuggestion(sqlSuggestions[activeSuggestion]);
      }
      // Close suggestions with Escape
      else if (e.key === 'Escape') {
        e.preventDefault();
        setShowSuggestions(false);
      }
    }
  };
  
  const applySuggestion = (suggestion: string) => {
    setQuery((prev) => prev + ' ' + suggestion);
    setShowSuggestions(false);
  };
  
  const handleRun = () => {
    if (onRun) onRun(query);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h3 className="text-lg font-medium">SQL Query</h3>
          <Badge variant="info" size="sm" className="ml-2">Editor</Badge>
        </div>
        <div className="text-xs text-gray-400">
          Press Ctrl+Space for suggestions
        </div>
      </div>
      <div className="relative">
        <div className={`relative font-mono bg-gray-850 border border-gray-700 rounded-lg ${editorHeight} overflow-hidden`}>
          <CodeEditor
            value={query}
            language="sql"
            placeholder="Type your SQL query here..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              fontSize: 14,
              backgroundColor: "transparent",
              fontFamily: "'JetBrains Mono', monospace",
              height: "100%",
              minHeight: editorHeight,
            }}
            className="w-full"
            padding={15}
            data-color-mode="dark"
          />
          
          {suggestions && showSuggestions && (
            <div className="absolute bottom-0 left-10 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-1 max-h-40 overflow-y-auto">
              {sqlSuggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className={`px-3 py-1.5 text-sm cursor-pointer ${
                    index === activeSuggestion 
                      ? 'bg-blue-600/40 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => applySuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <div className="space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setQuery('')}
          >
            Clear
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setQuery(initialQuery)}
          >
            Reset
          </Button>
        </div>
        <Button 
          variant="primary" 
          size="sm"
          onClick={handleRun}
          isLoading={isLoading}
          disabled={isLoading}
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
          }
        >
          Run Query
        </Button>
      </div>
    </div>
  );
}
