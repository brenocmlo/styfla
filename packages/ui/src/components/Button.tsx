import React from 'react';
import { cn } from '../utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'pix' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const sizeStyles = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-11 px-5 text-xs font-bold tracking-wider',
      lg: 'h-13 px-8 text-sm font-black tracking-widest',
    };

    const variantStyles = {
      primary:
        'bg-white text-black hover:bg-zinc-200 active:scale-[0.99] transition-all duration-150 shadow-md font-black',
      dark:
        'bg-black text-white hover:bg-zinc-900 border border-white/20 active:scale-[0.99] transition-all duration-150 font-black',
      secondary:
        'bg-zinc-900 text-zinc-100 border border-white/10 hover:bg-zinc-800 hover:border-white/30 active:scale-[0.99] transition-all duration-150',
      outline:
        'border-2 border-white text-white bg-transparent hover:bg-white hover:text-black active:scale-[0.99] transition-all duration-150 font-black',
      ghost:
        'text-zinc-400 hover:bg-white/10 hover:text-white transition-all duration-150',
      pix:
        'bg-white text-black hover:bg-zinc-200 active:scale-[0.99] transition-all duration-150 font-black border border-white',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-none font-sans uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-40 disabled:pointer-events-none cursor-pointer select-none',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
