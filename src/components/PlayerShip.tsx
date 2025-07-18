'use client';

import { useEffect, useRef, useState } from 'react';

type PlayerShipProps = {
  containerWidth: number;
  containerHeight: number;
  width?: number;
  height?: number;
  onShoot: (x: number, y: number) => void;
};

export default function PlayerShip({
  containerWidth,
  containerHeight,
  width = 80,
  height = 80,
  onShoot,
}: PlayerShipProps) {
  const [position, setPosition] = useState({
    x: containerWidth / 2 - width / 2,
    y: containerHeight - height - 20,
  });

  const speed = 8;
  const keysRef = useRef<Record<string, boolean>>({});
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.code === 'Space') {
        onShoot(position.x + width / 2, position.y); // dispara do meio da nave
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    const move = () => {
      setPosition((pos) => {
        let newX = pos.x;
        let newY = pos.y;

        if (keysRef.current['ArrowLeft'] || keysRef.current['a']) {
          newX = Math.max(0, newX - speed);
        }
        if (keysRef.current['ArrowRight'] || keysRef.current['d']) {
          newX = Math.min(containerWidth - width, newX + speed);
        }
        if (keysRef.current['ArrowUp'] || keysRef.current['w']) {
          newY = Math.max(0, newY - speed);
        }
        if (keysRef.current['ArrowDown'] || keysRef.current['s']) {
          newY = Math.min(containerHeight - height, newY + speed);
        }

        return { x: newX, y: newY };
      });

      animationRef.current = requestAnimationFrame(move);
    };

    animationRef.current = requestAnimationFrame(move);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [containerWidth, containerHeight, height, width, onShoot, position.x, position.y]);

  return (
    <img
      src="/assets/gifs/player.gif"
      alt="Player Ship"
      draggable={false}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width,
        height,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  );
}
