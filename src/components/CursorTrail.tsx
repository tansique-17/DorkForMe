import React, { useEffect } from 'react';

const CursorTrail = () => {
  useEffect(() => {
    const dots: HTMLDivElement[] = [];
    const mouse = { x: 0, y: 0 };
    const maxDots = 15;

    const createDot = () => {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail';
      document.body.appendChild(dot);
      dots.push(dot);

      if (dots.length > maxDots) {
        const removed = dots.shift();
        removed?.remove();
      }
    };

    const updateDots = () => {
      dots.forEach((dot, index) => {
        const nextDot = dots[index + 1] || dots[0];
        const scale = 1 - index / dots.length;
        
        dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) scale(${scale})`;
        dot.style.opacity = scale.toString();
      });
      requestAnimationFrame(updateDots);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      createDot();
    };

    document.addEventListener('mousemove', handleMouseMove);
    updateDots();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      dots.forEach(dot => dot.remove());
    };
  }, []);

  return null;
};

export default CursorTrail;