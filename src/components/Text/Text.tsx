import { PropsWithChildren } from 'react';

const textVariants = {
  low: 'text-base tracking-wide font-arges',
  'low-bold': 'text-lg font-semibold tracking-tight font-mori',
};

interface TextProps extends PropsWithChildren {
  variant: keyof typeof textVariants;
  text?: string;
}

export default function Text({ variant, text, children }: TextProps) {
  return <span className={textVariants[variant]}>{text || children}</span>;
}
