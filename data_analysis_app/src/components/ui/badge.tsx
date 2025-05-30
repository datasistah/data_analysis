// src/components/ui/badge.tsx
import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'md',
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full font-medium';
  
  const variants = {
    default: 'bg-gray-700 text-gray-200',
    primary: 'bg-blue-600/20 text-blue-400 border border-blue-600/40',
    secondary: 'bg-purple-600/20 text-purple-400 border border-purple-600/40',
    success: 'bg-green-600/20 text-green-400 border border-green-600/40',
    warning: 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/40',
    danger: 'bg-red-600/20 text-red-400 border border-red-600/40',
    info: 'bg-cyan-600/20 text-cyan-400 border border-cyan-600/40',
  };
  
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
