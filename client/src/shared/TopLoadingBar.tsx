// components/RouteLoadingBar.tsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default function TopLoadingBar() {
  const ref = useRef<any>(null);
  const location = useLocation();

  useEffect(() => {
    ref.current?.continuousStart();
    const timeout = setTimeout(() => {
      ref.current?.complete();
    }, 80); // Adjust based on your route speed

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return <LoadingBar height={2} color="#0f54a0" ref={ref} />
}
