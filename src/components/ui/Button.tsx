import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  children,
  className,
  type = 'button'
}) => {
  const baseClasses = 'font-bold rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-accent hover:text-black shadow-md hover:shadow-lg',
    secondary: 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 active:bg-neutral-400',
    accent: 'bg-accent text-black hover:bg-primary hover:text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
      whileHover={!isDisabled ? { 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      } : {}}
      whileTap={!isDisabled ? { 
        scale: 0.98,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      } : {}}
    >
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span>{children}</span>
    </motion.button>
  );
};
