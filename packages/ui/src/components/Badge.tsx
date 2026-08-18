import React from 'react';
import { cn } from '../utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'black'
    | 'white'
    | 'outline'
    | 'red'
    | 'pix'
    | 'gold'
    | 'white-belt'
    | 'blue-belt'
    | 'purple-belt'
    | 'brown-belt'
    | 'black-belt';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-zinc-900 text-zinc-300 border-white/10',
    black: 'bg-black text-white border-white/30',
    white: 'bg-white text-black border-white font-black',
    outline: 'bg-transparent text-white border-white/40',
    red: 'bg-red-600 text-white border-red-500 font-bold',
    pix: 'bg-white text-black border-white font-bold',
    gold: 'bg-amber-500 text-black border-amber-400 font-bold',
    'white-belt': 'bg-white text-black border-zinc-300 font-bold',
    'blue-belt': 'bg-blue-600 text-white border-blue-500 font-bold',
    'purple-belt': 'bg-purple-600 text-white border-purple-500 font-bold',
    'brown-belt': 'bg-amber-900 text-amber-100 border-amber-800 font-bold',
    'black-belt': 'bg-black text-white border-l-4 border-l-red-600 border-zinc-700 font-bold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider border',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
