'use client';

type EnemyBulletProps = {
  x: number;
  y: number;
};

export default function EnemyBullet({ x, y }: EnemyBulletProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 6,
        height: 14,
        backgroundColor: 'red',
        borderRadius: '3px',
        boxShadow: '0 0 6px red',
      }}
    />
  );
}
