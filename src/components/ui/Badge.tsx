import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'amber' | 'steel' | 'emerald';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'steel',
  className = '',
  icon,
}) => {
  const variantStyles = {
    steel: 'bg-slate-800/80 text-slate-300 border-slate-700/80',
    blue: 'bg-sky-950/60 text-sky-400 border-sky-800/60',
    amber: 'bg-amber-950/50 text-amber-300 border-amber-800/60',
    emerald: 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium tracking-wide uppercase rounded-sm border ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="w-3.5 h-3.5 flex items-center justify-center">{icon}</span>}
      {children}
    </span>
  );
};
