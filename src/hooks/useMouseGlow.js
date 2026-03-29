import { useEffect, useState } from 'react';

export const useMouseGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    let t = [];
    const updateMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      
      // Target checks for 40px hover ring
      const target = e.target.closest('a, button, [role="button"], .hover-target');
      setHovering(!!target);

      // Trailing logic (append fast, slice old)
      t.push({ x: e.clientX, y: e.clientY, id: Date.now() });
      if (t.length > 5) t.shift();
      setTrail([...t]);
    };

    window.addEventListener('mousemove', updateMove);
    return () => window.removeEventListener('mousemove', updateMove);
  }, []);

  // Naturally clear trail when resting
  useEffect(() => {
    const i = setInterval(() => {
      setTrail(curr => (curr.length > 0 ? curr.slice(1) : []));
    }, 100);
    return () => clearInterval(i);
  }, []);

  return { pos, hovering, trail };
};
