'use client';

import Image from 'next/image';

type EnemyShipProps = {
  x: number;
  y: number;
};

export default function EnemyShip({ x, y }: EnemyShipProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 60,
        height: 60,
        pointerEvents: 'none',
      }}
    >
      <Image
        src="/assets/gifs/enemy.gif"
        alt="Enemy Ship"
        width={60}
        height={60}
        unoptimized
      />
    </div>
  );
}

