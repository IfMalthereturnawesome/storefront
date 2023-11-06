// useBetterMediaQuery.jsx
import {useState, useEffect} from 'react';

export default function useBetterMediaQuery(mediaQueryString) {
  const [matches, setMatches] = useState(null);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(mediaQueryString);
      const listener = () => setMatches(!!mediaQueryList.matches);

      listener();

      mediaQueryList.addEventListener('change', listener);
      return () => mediaQueryList.removeEventListener('change', listener);
    }
  }, [mediaQueryString]);

  return matches;
}
