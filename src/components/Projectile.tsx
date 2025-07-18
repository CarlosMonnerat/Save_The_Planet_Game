'use client';

type ProjectileProps = {
  x: number;
  y: number;
};

export default function Projectile({ x, y }: ProjectileProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: '4px',
        height: '12px',
        backgroundColor: 'red',
        borderRadius: '2px',
      }}
    />
  );
}
