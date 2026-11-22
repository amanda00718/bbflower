import React from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  flower: 'bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-medium hover:scale-105',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  soft: 'bg-gradient-soft text-foreground hover:bg-accent hover:shadow-soft',
};
const sizes = { default: 'h-10 px-4 py-2', lg: 'h-11 rounded-md px-8', icon: 'h-10 w-10' };
type Props = React.ComponentPropsWithoutRef<'button'> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({ variant = 'default', size = 'default', type = 'button', className, ...props }: Props) {
  return <button type={type} className={cn('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0', variants[variant], sizes[size], className)} {...props} />;
}
