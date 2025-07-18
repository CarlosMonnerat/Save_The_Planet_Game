'use client';

import { useEffect, useState } from 'react';

type BulletProps = {
  startX: number;
  startY: number;
  onOutOfBounds: () => void;
  speed?: number;
};

export default function Bullet({ startX, startY, onOutOfBounds, speed = 10 }: BulletProps) {
  const [y, setY] = useState(startY);

  useEffect(() => {
    let animationFrameId: number;

    const move = () => {
      setY((prevY) => {
        const newY = prevY - speed;
        if (newY < -20) {
          onOutOfBounds();
        }
        return newY;
      });
      animationFrameId = requestAnimationFrame(move);
    };

    animationFrameId = requestAnimationFrame(move);

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed, onOutOfBounds]);

  return (
    <div
      style={{
        position: 'absolute',
        left: startX + 35, // ajusta centralização do tiro na nave
        top: y,
        width: 10,
        height: 20,
        backgroundColor: 'blue',
        borderRadius: '2px',
        boxShadow: '0 0 8px blue',
      }}
    />
  );
}
