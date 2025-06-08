import React, { useEffect, useRef } from "react";

const LogoRibbon: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const updateRotation = () => {
      if (!wrapperRef.current) return;

      // Get the ribbon's position relative to the viewport
      const rect = wrapperRef.current.getBoundingClientRect();
      const ribbonHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate the ribbon's center position
      const ribbonCenter = rect.top + ribbonHeight / 2;
      
      // Calculate progress through the viewport
      // -1 when ribbon center is at bottom of viewport
      // 0 when ribbon center is at middle of viewport
      // 1 when ribbon center is at top of viewport
      const progress = (windowHeight / 2 - ribbonCenter) / (windowHeight / 2);
      
      // Clamp progress between -1 and 1
      const clampedProgress = Math.max(-1, Math.min(1, progress));
      
      // Convert to rotation angle
      // At -1 (bottom): 0deg
      // At 0 (middle): 180deg
      // At 1 (top): 0deg
      const rotationY = Math.abs(clampedProgress) * 180;
      
      // Apply rotation to each logo
      logosRef.current.forEach((logo) => {
        if (logo) {
          logo.style.transform = `perspective(800px) rotateY(${rotationY}deg)`;
        }
      });
    };

    // Initial update
    updateRotation();

    window.addEventListener("scroll", updateRotation);
    window.addEventListener("resize", updateRotation);
    
    return () => {
      window.removeEventListener("scroll", updateRotation);
      window.removeEventListener("resize", updateRotation);
    };
  }, []);

  // For demo purposes, using placeholder image
  const logo = "/images/5.png";

  return (
    <div ref={wrapperRef} className="logo-ribbon-wrapper">
      <div className="logo-ribbon-track">
        {Array.from({ length: 10 }).map((_, index) => (
          <img
            key={index}
            ref={(el) => {
              if (el) logosRef.current[index] = el;
            }}
            src={logo}
            alt="Uncensored Studios"
            className="h-10 md:h-12 object-contain opacity-90"
            draggable={false}
            style={{ transition: 'transform 0.2s ease-out' }}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoRibbon;