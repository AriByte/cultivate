import React from 'react';

export const Badge = ({
  children,
  variant = 'emerald',
  size = 'md',
  className = '',
  icon: Icon,
}) => {
  const baseStyles = 'inline-flex items-center font-semibold rounded-full select-none';

  const variants = {
    emerald: 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]',
    forest: 'bg-[#0E2A1E] text-white',
    earth: 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]',
    sun: 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]',
    water: 'bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD]',
    neutral: 'bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.emerald} ${sizes[size] || sizes.md} ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
};
