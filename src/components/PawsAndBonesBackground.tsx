import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { PawPrint, Bone as BoneIconLucide } from 'lucide-react';

interface PawsAndBonesBackgroundProps {
  density?: number;
  speed?: number;
  iconSize?: number;
}

interface AnimatedIcon {
  id: number;
  type: 'paw' | 'bone';
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  direction?: 'up' | 'diagonal';
  animationId: number;
}

const PawsAndBonesBackground: React.FC<PawsAndBonesBackgroundProps> = ({
  density = 20,
  speed = 1,
  iconSize = 24
}) => {
  const [icons, setIcons] = useState<AnimatedIcon[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [animationCounter, setAnimationCounter] = useState(0);

  // Handle window resize for responsive density
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate responsive density based on screen size
  const responsiveDensity = useMemo(() => {
    if (windowWidth === 0) return density; // Default before window is measured
    
    if (windowWidth < 640) { // Mobile
      return Math.max(8, Math.floor(density * 0.3)); // 30% of desktop density, minimum 8
    } else if (windowWidth < 1024) { // Tablet
      return Math.max(12, Math.floor(density * 0.6)); // 60% of desktop density, minimum 12
    }
    return density; // Desktop - full density
  }, [windowWidth, density]);

  const generateRandomIcon = useCallback((id: number, existingIcons: AnimatedIcon[] = []) => {
    const isPaw = Math.random() > 0.5;
    const baseSize = iconSize + Math.random() * (iconSize * 1.2);
    const minDistance = 8; // Minimum distance between icons in percentage
    
    let x, y, attempts = 0;
    
    do {
      x = Math.random() * 85 + 5; // Keep 5% margin from edges
      y = Math.random() * 85 + 5;
      attempts++;
    } while (
      attempts < 20 && 
      existingIcons.some(icon => 
        Math.abs(icon.x - x) < minDistance && Math.abs(icon.y - y) < minDistance
      )
    );
    
    return {
      id,
      type: isPaw ? 'paw' : 'bone' as 'paw' | 'bone',
      x,
      y,
      size: baseSize,
      duration: (3 + Math.random() * 4) / speed, // Longer duration for smoother effect
      delay: Math.random() * 3, // Longer delay range
      direction: isPaw ? 'diagonal' : 'up' as 'diagonal' | 'up',
      animationId: animationCounter
    };
  }, [iconSize, speed, animationCounter]);

  useEffect(() => {
    const initialIcons: AnimatedIcon[] = [];
    for (let i = 0; i < responsiveDensity; i++) {
      initialIcons.push(generateRandomIcon(i, initialIcons));
    }
    setIcons(initialIcons);
  }, [responsiveDensity, generateRandomIcon]);

  // Seamless individual icon regeneration
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    // Create individual timers for each icon position
    for (let i = 0; i < responsiveDensity; i++) {
      const randomDelay = Math.random() * 2000; // Random initial delay up to 2 seconds
      const interval = setTimeout(() => {
        const recurringInterval = setInterval(() => {
          setIcons(prevIcons => {
            const newIcons = [...prevIcons];
            if (newIcons[i]) {
              setAnimationCounter(prev => prev + 1);
              newIcons[i] = {
                ...generateRandomIcon(newIcons[i].id, newIcons.filter((_, idx) => idx !== i)),
                delay: 0 // Start immediately
              };
            }
            return newIcons;
          });
        }, 4000 + Math.random() * 3000); // Each icon regenerates every 4-7 seconds
        
        intervals.push(recurringInterval);
      }, randomDelay);
      
      intervals.push(interval);
    }

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [responsiveDensity, generateRandomIcon]);

  // Update animation counter for new icons
  const updateAnimationCounter = useCallback(() => {
    setAnimationCounter(prev => prev + 1);
  }, []);

  useEffect(() => {
    updateAnimationCounter();
  }, [responsiveDensity, updateAnimationCounter]);

  // === NEW: use lucide-react icons ===
  const PawIcon = ({ size }: { size: number }) => (
    <PawPrint
      width={size}
      height={size}
      className="text-pink-400"
      strokeWidth={2}
    />
  );

  const BoneIcon = ({ size }: { size: number }) => (
    <BoneIconLucide
      width={size}
      height={size}
      className="text-pink-500"
      strokeWidth={2}
    />
  );
  // ===================================

  return (
    <>
      <style jsx>{`
        @keyframes pawPop {
          0% { 
            transform: scale(0) rotate(0deg); 
            opacity: 0; 
          }
          10% { 
            transform: scale(0.3) rotate(2deg); 
            opacity: 0.3; 
          }
          20% { 
            transform: scale(1.1) rotate(5deg); 
            opacity: 0.8; 
          }
          80% { 
            transform: scale(1) rotate(-3deg); 
            opacity: 0.6; 
          }
          90% { 
            transform: scale(0.3) rotate(8deg); 
            opacity: 0.2; 
          }
          100% { 
            transform: scale(0) rotate(10deg); 
            opacity: 0; 
          }
        }
        @keyframes bonePop {
          0% { 
            transform: scale(0) rotate(0deg); 
            opacity: 0; 
          }
          15% { 
            transform: scale(0.4) rotate(90deg); 
            opacity: 0.4; 
          }
          25% { 
            transform: scale(1.1) rotate(180deg); 
            opacity: 0.7; 
          }
          75% { 
            transform: scale(1) rotate(300deg); 
            opacity: 0.5; 
          }
          85% { 
            transform: scale(0.4) rotate(450deg); 
            opacity: 0.2; 
          }
          100% { 
            transform: scale(0) rotate(540deg); 
            opacity: 0; 
          }
        }
        .paw-animation {
          animation: pawPop var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
        .bone-animation {
          animation: bonePop var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
      `}</style>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {icons.map((icon) => (
          <div
            key={icon.id}
            className={`absolute ${icon.type === 'paw' ? 'paw-animation' : 'bone-animation'}`}
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              '--duration': `${icon.duration}s`,
              '--delay': `${icon.delay}s`
            } as React.CSSProperties}
          >
            {icon.type === 'paw' ? (
              <PawIcon size={icon.size} />
            ) : (
              <BoneIcon size={icon.size} />
            )}
          </div>
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-transparent to-pink-200/20 pointer-events-none" />
      </div>
    </>
  );
};

export default PawsAndBonesBackground;
