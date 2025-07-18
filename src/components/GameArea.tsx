'use client';

import { useEffect, useState } from 'react';
import PlayerShip from './PlayerShip';
import EnemyShip from './EnemyShip';
import Bullet from './Bullet';

type BulletData = {
  id: number;
  x: number;
  y: number;
};

export default function GameArea() {
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [bullets, setBullets] = useState<BulletData[]>([]);
  const [bulletId, setBulletId] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleShoot = (x: number, y: number) => {
    const id = bulletId;
    setBulletId(id + 1);
    setBullets((prev) => [...prev, { id, x, y }]);
  };

  const removeBullet = (id: number) => {
    setBullets((prev) => prev.filter((b) => b.id !== id));
  };

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
      <PlayerShip
        containerWidth={size.width}
        containerHeight={size.height}
        onShoot={handleShoot}
      />

      <EnemyShip
        x={size.width / 2 - 40}
        y={50}
        width={80}
        height={80}
      />

      {bullets.map((bullet) => (
        <Bullet
          key={bullet.id}
          startX={bullet.x}
          startY={bullet.y}
          onOutOfBounds={() => removeBullet(bullet.id)}
        />
      ))}
    </div>
  );
}
