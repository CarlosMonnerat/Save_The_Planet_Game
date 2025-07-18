'use client';

import { useState, useEffect } from 'react';
import PlayerShip from './PlayerShip';
import EnemyShip from './EnemyShip';

export default function GameArea() {
  const [size, setSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    updateSize();

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: size.width,
        height: size.height,
        backgroundColor: 'black',
        overflow: 'hidden',
      }}
    >
      <PlayerShip containerWidth={size.width} containerHeight={size.height} />

      <EnemyShip
        x={size.width / 2 - 40}
        y={50}
        width={60}
        height={60}
      />
    </div>
  );
}
