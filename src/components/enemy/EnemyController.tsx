'use client';

import { useEffect, useState } from 'react';
import EnemyShip from './EnemyShip';

type Position = { x: number; y: number };
type Enemy = {
  id: number;
  x: number;
  y: number;
  speed: number;
  dx: number; // direção x (normalizado)
  dy: number; // direção y (normalizado)
};

type EnemyControllerProps = {
  playerPosition: Position;
  containerWidth: number;
  containerHeight: number;
  onEnemyShoot: (pos: Position) => void;
};

const MAX_ENEMIES = 1;
const SHOOT_DISTANCE = 200;
const ENEMY_SPEED = 4;

export default function EnemyController({
  playerPosition,
  containerWidth,
  containerHeight,
  onEnemyShoot,
}: EnemyControllerProps) {
  const [enemies, setEnemies] = useState<Enemy[]>([]);

  useEffect(() => {
    // Inicializa inimigos em posições aleatórias
    const initialEnemies: Enemy[] = Array.from({ length: MAX_ENEMIES }, (_, i) => {
      const x = Math.random() * (containerWidth - 60);
      const y = Math.random() * (containerHeight / 2);
      return { id: i, x, y, speed: ENEMY_SPEED, dx: 0, dy: 0 };
    });
    setEnemies(initialEnemies);
  }, [containerWidth, containerHeight]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnemies((prev) =>
        prev.map((enemy) => {
          // Vetor direção para o player
          const diffX = playerPosition.x - enemy.x;
          const diffY = playerPosition.y - enemy.y;
          const dist = Math.sqrt(diffX * diffX + diffY * diffY) || 1;

          // Direção normalizada
          const dx = diffX / dist;
          const dy = diffY / dist;

          // Move inimigo em direção ao player
          let newX = enemy.x + dx * enemy.speed;
          let newY = enemy.y + dy * enemy.speed;

          // Mantém dentro da tela
          newX = Math.min(Math.max(0, newX), containerWidth - 60);
          newY = Math.min(Math.max(0, newY), containerHeight - 60);

          // Dispara se estiver perto o suficiente
          if (dist < SHOOT_DISTANCE) {
            onEnemyShoot({ x: newX + 30, y: newY + 60 }); // ajuste posição do tiro
          }

          return { ...enemy, x: newX, y: newY, dx, dy };
        })
      );
    }, 50); // 20fps para movimentação + tiro

    return () => clearInterval(interval);
  }, [playerPosition, containerWidth, containerHeight, onEnemyShoot]);

  return (
    <>
      {enemies.map((enemy) => (
        <EnemyShip key={enemy.id} x={enemy.x} y={enemy.y} />
      ))}
    </>
  );
}
