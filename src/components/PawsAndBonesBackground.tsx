import React, { useMemo, useState, useEffect, useCallback } from 'react';

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
}

const PawsAndBonesBackground: React.FC<PawsAndBonesBackgroundProps> = ({
  density = 20,
  speed = 1,
  iconSize = 24
}) => {
  const [icons, setIcons] = useState<AnimatedIcon[]>([]);

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
      duration: (2 + Math.random() * 4) / speed,
      delay: Math.random() * 2,
      direction: isPaw ? 'diagonal' : 'up' as 'diagonal' | 'up'
    };
  }, [iconSize, speed]);

  useEffect(() => {
    const initialIcons: AnimatedIcon[] = [];
    for (let i = 0; i < density; i++) {
      initialIcons.push(generateRandomIcon(i, initialIcons));
    }
    setIcons(initialIcons);
  }, [density, generateRandomIcon]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIcons(prevIcons => {
        const newIcons: AnimatedIcon[] = [];
        for (let i = 0; i < prevIcons.length; i++) {
          newIcons.push({
            ...generateRandomIcon(prevIcons[i].id, newIcons),
            delay: 0
          });
        }
        return newIcons;
      });
    }, 1500 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [generateRandomIcon]);

  const PawIcon = ({ size }: { size: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="text-pink-400"
    >
      <ellipse cx="8" cy="6" rx="2" ry="3" fill="currentColor" />
      <ellipse cx="16" cy="6" rx="2" ry="3" fill="currentColor" />
      <ellipse cx="6" cy="12" rx="1.5" ry="2" fill="currentColor" />
      <ellipse cx="18" cy="12" rx="1.5" ry="2" fill="currentColor" />
      <ellipse cx="12" cy="16" rx="3" ry="4" fill="currentColor" />
    </svg>
  );

  const BoneIcon = ({ size }: { size: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="text-pink-500"
    >
      <path
        d="M6 12h12M6 12c-1.5-1.5-3-1-3-3s1.5-1.5 3 0M6 12c-1.5 1.5-3 1-3 3s1.5 1.5 3 0M18 12c1.5-1.5 3-1 3-3s-1.5-1.5-3 0M18 12c1.5 1.5 3 1 3 3s-1.5 1.5-3 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <>
      <style jsx>{`
        @keyframes pawPop {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            transform: scale(1.2) rotate(5deg);
            opacity: 0.8;
          }
          85% {
            transform: scale(1) rotate(-5deg);
            opacity: 0.6;
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
          20% {
            transform: scale(1.1) rotate(180deg);
            opacity: 0.7;
          }
          80% {
            transform: scale(1) rotate(360deg);
            opacity: 0.5;
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