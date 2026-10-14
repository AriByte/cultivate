import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  variant = 'elevated',
  interactive = false,
  padding = 'default',
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-200';

  const variants = {
    elevated: 'bg-white border border-[#E6EBE6] shadow-xs',
    subtle: 'bg-[#F9FAF8] border border-[#EAEFEA]',
    outlined: 'bg-white border border-[#D5DDD5]',
    nature: 'bg-[#F0FDF4] border border-[#BBF7D0]',
    earth: 'bg-[#FEFCE8] border border-[#FEF08A]',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  const interactiveStyles = interactive
    ? 'cursor-pointer hover:shadow-md hover:border-[#10B981]/50 hover:-translate-y-0.5'
    : '';

  if (interactive) {
    return (
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant] || variants.elevated} ${paddings[padding]} ${interactiveStyles} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.elevated} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
