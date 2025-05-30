'use client';

import { useRef, useState, useEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Line, Pie, Scatter, Bubble, Radar, PolarArea, Doughnut } from 'react-chartjs-2';
import { ChartConfig } from '@/lib/types';

ChartJS.register(...registerables);

interface VisualizationProps {
  chartConfig: ChartConfig;
  title?: string;
  description?: string;
  className?: string;
}

export default function Visualization({ 
  chartConfig,
  title,
  description,
  className = '',
}: VisualizationProps) {
  const chartRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  // Function to render the appropriate chart component based on chart type
  const renderChart = () => {
    switch(chartConfig.type) {
      case 'bar':
        return <Bar 
          ref={chartRef}
          data={chartConfig.data}
          options={chartConfig.options} 
        />;
      case 'line':
        return <Line 
          ref={chartRef}
          data={chartConfig.data} 
          options={chartConfig.options} 
        />;
      case 'pie':
        return <Pie 
          ref={chartRef}
          data={chartConfig.data} 
          options={chartConfig.options} 
        />;
      case 'scatter':
        return <Scatter 
          ref={chartRef}
          data={chartConfig.data} 
          options={chartConfig.options} 
        />;
      case 'bubble':
        return <Bubble 
          ref={chartRef}
          data={chartConfig.data} 
          options={chartConfig.options} 
        />;
      case 'radar':
        return <Radar 
          ref={chartRef}
          data={chartConfig.data} 
          options={chartConfig.options} 
        />;
      case 'polarArea':
        return <PolarArea 
          ref={chartRef}
          data={chartConfig.data} 
          options={chartConfig.options} 
        />;
      case 'doughnut':
        return <Doughnut
          ref={chartRef}
          data={chartConfig.data} 
          options={chartConfig.options} 
        />;
      default:
        return <div className="p-6 text-center text-gray-400">Invalid chart type</div>;
    }
  };

  const downloadChart = () => {
    const chartInstance = chartRef.current;
    if (!chartInstance) return;
    
    const link = document.createElement('a');
    link.download = `${title || 'chart'}-${new Date().toISOString()}.png`;
    link.href = chartInstance.toBase64Image();
    link.click();
  };
  
  return (
    <div className={`
      ${isFullscreen ? 
        'fixed inset-0 z-50 bg-gray-900 p-4 flex flex-col' : 
        'bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden ' + className}
    `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div>
          {title && <h3 className="font-medium">{title}</h3>}
          {description && <p className="text-sm text-gray-400">{description}</p>}
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={downloadChart}
            className="p-1.5 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition-colors"
            title="Download"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="p-1.5 hover:bg-gray-700 rounded-md text-gray-400 hover:text-white transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M15 9H19.5M15 9V4.5M15 15v4.5M15 15H19.5M9 15H4.5M9 15v4.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m9 0v4.5m0-4.5h4.5m0 9v4.5m0-4.5h4.5m-9 0H9m1.5-9v4.5m0-4.5h4.5m-9 9h4.5m-4.5 0v4.5m4.5-13.5h-4.5m4.5 0v4.5" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Chart */}
      <div className={`${isFullscreen ? 'flex-grow' : 'p-4 h-64'}`}>
        {renderChart()}
      </div>
    </div>
  );
}
