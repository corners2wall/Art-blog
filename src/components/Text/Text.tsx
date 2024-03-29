import { ElementType, PropsWithChildren } from 'react';
import './style.css';
type TextVariant =
  | 'small'
  | 'small-bold'
  | 'medium'
  | 'medium-bold'
  | 'medium-title'
  | 'medium-large'
  | 'large'
  | 'extra-large';

interface TextProps extends PropsWithChildren {
  variant: TextVariant;
  text?: string;
  as?: ElementType;
  className?: string;
}

export default function Text({
  variant,
  text,
  children,
  as: Tag = 'span',
  className = '',
}: TextProps) {
  return <Tag className={`${variant} ${className}`}>{text || children}</Tag>;
}
