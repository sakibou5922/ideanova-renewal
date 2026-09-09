import type { ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost';

type LinkButtonProps = {
  to: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type NativeButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant;
};

function cls(variant: Variant, extra?: string) {
  return [styles.button, styles[variant], extra].filter(Boolean).join(' ');
}

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkButton({ to, variant = 'primary', className, children }: LinkButtonProps) {
  return (
    <Link to={to} className={cls(variant, className)}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

export function Button({ variant = 'primary', className, children, ...rest }: NativeButtonProps) {
  return (
    <button className={cls(variant, className)} {...rest}>
      <span>{children}</span>
      <Arrow />
    </button>
  );
}
