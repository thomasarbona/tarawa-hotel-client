import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';

function useWindowWidth(delay = 700) {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setWidth(window.innerWidth);
    const debouncedHandleResize = debounce(handleResize, delay);
    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [delay]);

  return width;
}

export default useWindowWidth;
