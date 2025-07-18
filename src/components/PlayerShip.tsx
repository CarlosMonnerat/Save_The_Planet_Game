'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import playerGif from '../../public/assets/gifs/player.gif';

type PlayerShipProps = {
  containerWidth: number;
  containerHeight: number;
  onShoot: (x: number, y: number) => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
};

export default function PlayerShip({
  containerWidth,
  containerHeight,
  onShoot,
  onPositionChange,
}: PlayerShipProps) {
  const [position, setPosition] = useState({
    x: containerWidth / 2 - 25,
    y: containerHeight - 100,
  });

  const speed = 10;

  // ✅ useRef para manter o estado das teclas entre renderizações
  const keysRef = useRef({
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code in keysRef.current) {
        keysRef.current[e.code as keyof typeof keysRef.current] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code in keysRef.current) {
        keysRef.current[e.code as keyof typeof keysRef.current] = false;

        if (e.code === 'Space') {
          onShoot(position.x + 25, position.y); // Centro da nave
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [position, onShoot]);

  useEffect(() => {
    const move = () => {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (keysRef.current.ArrowLeft) newX -= speed;
        if (keysRef.current.ArrowRight) newX += speed;
        if (keysRef.current.ArrowUp) newY -= speed;
        if (keysRef.current.ArrowDown) newY += speed;

        newX = Math.max(0, Math.min(containerWidth - 50, newX));
        newY = Math.max(0, Math.min(containerHeight - 50, newY));

        const newPos = { x: newX, y: newY };

        if (newPos.x !== prev.x || newPos.y !== prev.y) {
          onPositionChange(newPos);
        }

        return newPos;
      });
    };

    const interval = setInterval(move, 16);
    return () => clearInterval(interval);
  }, [containerWidth, containerHeight, onPositionChange]);

  return (
    <div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        width: 50,
        height: 50,
        zIndex: 10,
      }}
    >
      <Image src={playerGif} alt="Player Ship" width={50} height={50} />
    </div>
  );
}
