'use client';

import { useEffect, useState } from 'react';
import PlayerShip from './PlayerShip';
import EnemyController from './enemy/EnemyController';

export default function GameArea() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleShoot = (x: number, y: number) => {
    console.log('Player shot at:', x, y);
  };

  const handlePlayerPositionChange = (pos: { x: number; y: number }) => {
    setPlayerPosition(pos);
  };

 type Position = { x: number; y: number };

  const handleEnemyShoot = (pos: Position) => {
    console.log('Enemy shot at:', pos.x, pos.y);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <PlayerShip
        containerWidth={dimensions.width}
        containerHeight={dimensions.height}
        onShoot={handleShoot}
        onPositionChange={handlePlayerPositionChange}
      />
      <EnemyController
        playerPosition={playerPosition}
        containerWidth={dimensions.width}
        containerHeight={dimensions.height}
        onEnemyShoot={handleEnemyShoot}
      />
    </div>
  );
}


