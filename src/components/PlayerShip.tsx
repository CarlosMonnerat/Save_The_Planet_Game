'use client';

import { useState, useEffect } from 'react';

type PlayerShipProps = {
  containerWidth: number;
  containerHeight: number;
  width?: number;
  height?: number;
};

export default function PlayerShip({
  containerWidth,
  containerHeight,
  width = 60,
  height = 60,
}: PlayerShipProps) {
  const [position, setPosition] = useState({ x: containerWidth / 2 - width / 2, y: containerHeight - height - 20 });
  const speed = 8;

  useEffect(() => {
    const keys: Record<string, boolean> = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId: number;

    const move = () => {
      setPosition((pos) => {
        let newX = pos.x;
        if (keys['ArrowLeft'] || keys['a']) newX = Math.max(0, newX - speed);
        if (keys['ArrowRight'] || keys['d']) newX = Math.min(containerWidth - width, newX + speed);
        return { ...pos, x: newX, y: pos.y };
      });
      animationFrameId = requestAnimationFrame(move);
    };

    animationFrameId = requestAnimationFrame(move);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerWidth, width, speed]);

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

