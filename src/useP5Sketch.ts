import { useEffect, useRef } from 'react';
import P5 from 'p5';

export function useP5Sketch(sketch: (p5: P5) => void) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if(!ref.current) {
        return
    }

    const p5 = new P5(sketch, ref.current);
    return p5.remove;
  }, [ref]);

  return ref;
}