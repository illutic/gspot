import React from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`card card-${variant} card-pad-${padding} ${hoverable ? 'card-hoverable' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
