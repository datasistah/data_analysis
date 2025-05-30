// src/components/ui/input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { 
      className = '',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      type = 'text',
      ...props
    }, 
    ref
  ) => {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500';
    
    return (
      <div className={widthClass}>
        {label && (
          <label className="block text-sm font-medium text-gray-200 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            className={`
              bg-gray-700 border ${errorClass} rounded-md block px-4 py-2 text-gray-100 
              focus:outline-none focus:ring-2
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${widthClass}
              ${className}
            `}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
