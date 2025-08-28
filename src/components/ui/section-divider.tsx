import React from 'react';

type FeatherProps = {
  at?: 'top' | 'bottom';
  to?: string;        // target bg color
  className?: string; // height etc.
};

export function Feather({ at = 'bottom', to = '#0A0E22', className = 'h-24' }: FeatherProps) {
  const angle = at === 'bottom' ? '180deg' : '0deg';
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${at === 'bottom' ? 'bottom-0' : 'top-0'} ${className}`}
      style={{ background: `linear-gradient(${angle}, rgba(10,14,34,0) 0%, ${to} 100%)` }}
    />
  );
}

export function Hairline() {
  return (
    <div className="relative">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent mb-24" />
    </div>
  );
}
