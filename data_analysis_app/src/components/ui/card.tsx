// src/components/ui/card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  withHover?: boolean;
  withBorder?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  withHover = false, 
  withBorder = false 
}: CardProps) {
  const hoverClass = withHover ? 'transition-all duration-150 hover:translate-y-[-2px] hover:shadow-lg' : '';
  const borderClass = withBorder ? 'border border-gray-700' : '';
  
  return (
    <div className={`bg-gray-800 rounded-xl overflow-hidden shadow-md ${hoverClass} ${borderClass} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-xl font-semibold text-white ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-sm text-gray-400 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-3 bg-gray-850 border-t border-gray-700 ${className}`}>
      {children}
    </div>
  );
}
