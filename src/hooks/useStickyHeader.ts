import { useRef, useState, useEffect } from 'react';

const DELAY = 100;

export const useStickyHeader = (threshold = 0.1) => {
  const [isSticky, setSticky] = useState(false);
  const sentinelRef = useRef(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
          setSticky(!entry.isIntersecting);
        }, DELAY);
      },
      { threshold }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [sentinelRef, threshold]);

  return { isSticky, sentinelRef };
};
