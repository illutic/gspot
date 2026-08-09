import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import './Button.css';

export interface LinkButtonProps extends LinkProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  return (
    <Link
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full-width' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
