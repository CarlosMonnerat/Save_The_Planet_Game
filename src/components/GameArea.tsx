'use client';

import { useEffect, useState } from 'react';
import PlayerShip from './PlayerShip';
import Projectile from './Projectile';

export default function GameArea() {
  const [projectiles, setProjectiles] = useState<{ x: number; y: number }[]>([]);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const handleShoot = (x: number, y: number) => {
    setProjectiles((prev) => [...prev, { x, y }]);
  };

  // Atualiza o tamanho da tela se a janela for redimensionada
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Atualiza a posição dos projéteis
  useEffect(() => {
    const interval = setInterval(() => {
      setProjectiles((prev) =>
        prev
          .map((p) => ({ x: p.x, y: p.y - 10 }))
          .filter((p) => p.y > 0)
      );
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: 'black',
      }}
    >
      <PlayerShip
        containerWidth={dimensions.width}
        containerHeight={dimensions.height}
        onShoot={handleShoot}
      />
      {projectiles.map((p, i) => (
        <Projectile key={i} x={p.x} y={p.y} />
      ))}
    </div>
  );
}
