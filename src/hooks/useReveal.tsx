import React from 'react';
import { Box } from '@mui/material';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  component?: React.ElementType;
  id?: string;
  sx?: object;
};

export function Reveal({ children, delay = 0, y = 28, component = 'div', id, sx }: RevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      setVisible(true);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      component={component}
      id={id}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : `translateY(${y}px)`,
        transition: 'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1), transform 650ms cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
