import { useEffect, useRef, useState } from 'react';

// Count-up al montar (de 0 al valor final).
export function useCountUp(target: number, duration = 1400, decimals = 0): number {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    const inicio = performance.now();
    const animar = (t: number) => {
      const p = Math.min(1, (t - inicio) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Number((target * eased).toFixed(decimals)));
      if (p < 1) raf.current = requestAnimationFrame(animar);
    };
    raf.current = requestAnimationFrame(animar);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, decimals]);
  return val;
}
