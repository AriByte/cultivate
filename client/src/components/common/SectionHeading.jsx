import React from 'react';

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) => {
  const alignment = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-12 sm:mb-16 ${alignment[align]} ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};
