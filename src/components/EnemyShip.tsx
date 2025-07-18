'use client';

type EnemyShipProps = {
  x: number;
  y: number;
  width?: number;
  height?: number;
};

export default function EnemyShip({ x, y, width = 80, height = 80 }: EnemyShipProps) {
  return (
    <img
      src="/assets/gifs/enemy.gif"
      alt="Enemy Ship"
      draggable={false}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  );
}
