import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const columns = Math.floor(window.innerWidth / 20);
    const matrixElements: HTMLElement[] = [];

    // Create matrix code elements
    for (let i = 0; i < columns; i++) {
      const element = document.createElement("div");
      element.className = "matrix-code";
      element.style.left = `${i * 20}px`;
      element.style.animationDuration = `${Math.random() * 5 + 3}s`;
      element.style.animationDelay = `${Math.random() * 5}s`;

      // Random matrix code
      const codeLength = Math.floor(Math.random() * 20) + 10;
      let code = "";
      for (let j = 0; j < codeLength; j++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      element.textContent = code;

      container.appendChild(element);
      matrixElements.push(element);
    }

    // Cleanup function
    return () => {
      matrixElements.forEach((element) => {
        if (container.contains(element)) {
          container.removeChild(element);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="animated-background" />;
};

export default AnimatedBackground;