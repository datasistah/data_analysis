'use client';

import { useState } from 'react';
import { SQLEditor } from '@/components/data/SQLEditor';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Visualization from '@/components/data/Visualization';
import { ChartConfig } from '@/lib/types';

// Mock data for the SQL query results
const mockData = {
  columns: ['product_name', 'category', 'price', 'inventory', 'sales'],
  rows: [
    { product_name: 'Laptop Pro', category: 'Electronics', price: 1299, inventory: 45, sales: 156 },
    { product_name: 'Phone X', category: 'Electronics', price: 999, inventory: 82, sales: 342 },
    { product_name: 'Coffee Maker', category: 'Home', price: 89, inventory: 112, sales: 74 },
    { product_name: 'Desk Lamp', category: 'Home', price: 29, inventory: 45, sales: 51 },
    { product_name: 'Headphones', category: 'Electronics', price: 129, inventory: 89, sales: 127 },
    { product_name: 'Water Bottle', category: 'Sports', price: 25, inventory: 233, sales: 187 },
    { product_name: 'Running Shoes', category: 'Sports', price: 119, inventory: 76, sales: 92 },
    { product_name: 'Toaster', category: 'Home', price: 49, inventory: 36, sales: 32 },
    { product_name: 'Tablet Mini', category: 'Electronics', price: 499, inventory: 64, sales: 89 },
    { product_name: 'Protein Powder', category: 'Sports', price: 59, inventory: 121, sales: 104 },
  ]
};

// Mock chart config for visualization
const mockChartConfig: ChartConfig = {
  type: 'bar',
  data: {
    labels: mockData.rows.map(row => row.product_name),
    datasets: [
      {
        label: 'Sales',
        data: mockData.rows.map(row => row.sales),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Sales',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

export default function SQLPlaygroundPage() {
  const [query, setQuery] = useState<string>("SELECT product_name, sales FROM products\nORDER BY sales DESC\nLIMIT 10;");
  const [results, setResults] = useState<typeof mockData | null>(null);
  const [chartConfig, setChartConfig] = useState<ChartConfig | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'results' | 'visualization'>('results');

  const runQuery = async (sqlQuery: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // In a real app, this would be an API call to execute the SQL query
      // For now, we'll just use mock data
      setResults(mockData);
      setChartConfig(mockChartConfig);
      
      // Add to query history if it's not already there
      if (!queryHistory.includes(sqlQuery)) {
        setQueryHistory((prev) => [sqlQuery, ...prev].slice(0, 10));
      }
    } catch (err: any) {
      console.error('Query execution error:', err);
      setError(err.message || 'Failed to execute query');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromHistory = (historicalQuery: string) => {
    setQuery(historicalQuery);
  };

  const clearHistory = () => {
    setQueryHistory([]);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">SQL Playground</h1>
        <p className="text-gray-400 max-w-3xl">
          Practice your SQL skills and learn how to analyze data with our interactive playground. 
          Write queries, visualize results, and build your data analysis portfolio.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Query Editor */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <SQLEditor
                initialQuery={query}
                onRun={runQuery}
                isLoading={isLoading}
                editorHeight="h-80"
              />
            </CardContent>
          </Card>
          
          {/* Query History */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Query History</h3>
              {queryHistory.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearHistory}
                  className="text-xs h-7"
                >
                  Clear History
                </Button>
              )}
            </div>
            
            {queryHistory.length === 0 ? (
              <p className="text-sm text-gray-500">No history yet. Run a query to get started.</p>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                {queryHistory.map((historyItem, index) => (
                  <button
                    key={index}
                    onClick={() => loadFromHistory(historyItem)}
                    className="w-full text-left p-3 bg-gray-800/30 hover:bg-gray-800/70 border border-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
                  >
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap font-mono">
                      {historyItem}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Results and Visualization */}
        <div>
          <Card className="bg-gray-800/50 border-gray-700 h-full">
            <div className="border-b border-gray-700">
              <div className="flex">
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'results' 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('results')}
                >
                  Results
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'visualization' 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('visualization')}
                  disabled={!results}
                >
                  Visualization
                </button>
              </div>
            </div>
            
            <CardContent className="p-4">
              {isLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-sm text-gray-400">Executing query...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="h-80 p-4 bg-red-900/20 border border-red-700 rounded-lg flex items-center justify-center">
                  <div className="text-center text-red-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-auto mb-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <p className="mb-2">Error: {error}</p>
                    <p className="text-sm">Please check your query syntax and try again.</p>
                  </div>
                </div>
              ) : results && activeTab === 'results' ? (
                <div className="h-80 overflow-auto">
                  <div className="inline-block min-w-full">
                    <table className="min-w-full border-separate border-spacing-0">
                      <thead className="bg-gray-900/50 sticky top-0">
                        <tr>
                          {results.columns.map((column, i) => (
                            <th 
                              key={i}
                              className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-700"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800/30">
                        {results.rows.map((row, rowIndex) => (
                          <tr 
                            key={rowIndex}
                            className={rowIndex % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}
                          >
                            {results.columns.map((column, colIndex) => (
                              <td 
                                key={`${rowIndex}-${colIndex}`}
                                className="px-4 py-2 text-sm border-b border-gray-800 whitespace-nowrap"
                              >
                                {row[column as keyof typeof row]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : chartConfig && activeTab === 'visualization' ? (
                <div className="h-80">
                  <Visualization chartConfig={chartConfig} />
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-500 mx-auto mb-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <p className="text-gray-400 font-medium mb-1">No Results Yet</p>
                    <p className="text-sm text-gray-500">Run a query to see results</p>
                  </div>
                </div>
              )}
              
              {results && activeTab === 'results' && (
                <div className="mt-4 text-sm text-right text-gray-400">
                  {results.rows.length} row{results.rows.length !== 1 ? 's' : ''} returned
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Additional Resources */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">SQL Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800/30 border-gray-700 hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/10 transition-all">
            <CardContent className="p-6">
              <div className="mb-4">
                <Badge variant="info">Beginner</Badge>
              </div>
              <h3 className="text-lg font-medium mb-2">SQL Basics</h3>
              <p className="text-sm text-gray-400 mb-4">Learn the fundamentals of SQL including SELECT, WHERE, GROUP BY, and JOIN statements.</p>
              <Button variant="outline" size="sm">View Guide</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/30 border-gray-700 hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/10 transition-all">
            <CardContent className="p-6">
              <div className="mb-4">
                <Badge variant="warning">Intermediate</Badge>
              </div>
              <h3 className="text-lg font-medium mb-2">Data Analysis Techniques</h3>
              <p className="text-sm text-gray-400 mb-4">Discover advanced querying techniques for data analysis, including window functions.</p>
              <Button variant="outline" size="sm">View Guide</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/30 border-gray-700 hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/10 transition-all">
            <CardContent className="p-6">
              <div className="mb-4">
                <Badge variant="success">Advanced</Badge>
              </div>
              <h3 className="text-lg font-medium mb-2">Performance Optimization</h3>
              <p className="text-sm text-gray-400 mb-4">Learn how to optimize your SQL queries for better performance and efficiency.</p>
              <Button variant="outline" size="sm">View Guide</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
