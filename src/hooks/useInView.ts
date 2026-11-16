import { useState, useEffect, useRef } from 'react';

interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      const timer = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, inView];
}
