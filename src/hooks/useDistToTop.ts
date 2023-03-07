import { useCallback, useEffect, useRef, useState } from 'react';

function useDistToTop(): [React.RefObject<HTMLDivElement>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;

    setPercentage(ref.current.getBoundingClientRect().top);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return [ref, percentage];
}

export default useDistToTop;
