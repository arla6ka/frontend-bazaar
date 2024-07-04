'use client';
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const onMouseOver = () => {
      setHovered(true);
    };

    const onMouseOut = () => {
      setHovered(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.querySelectorAll('button, a, input, article, .suggestion-card').forEach(el => {
      el.addEventListener('mouseover', onMouseOver);
      el.addEventListener('mouseout', onMouseOut);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.querySelectorAll('button, a, input, article, .suggestion-card').forEach(el => {
        el.removeEventListener('mouseover', onMouseOver);
        el.removeEventListener('mouseout', onMouseOut);
      });
    };
  }, []);

  return <div ref={cursorRef} className={`cursor ${hovered ? 'hovered' : ''}`} />;
};

export default CustomCursor;
