'use client';

import { useRef, useEffect } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Posição e tamanho das naves
    let playerX = canvas.width / 2 - 40;
    let playerY = canvas.height - 120;
    const playerWidth = 60;
    const playerHeight = 60;

    let enemyX = canvas.width / 2 - 40;
    let enemyY = 50;
    const enemyWidth = 60;
    const enemyHeight = 60;

    // Carregar imagens
    const playerImage = new Image();
    const enemyImage = new Image();
    let imagesLoaded = 0;

    const checkAllLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === 2) {
        requestAnimationFrame(gameLoop);
      }
    };

    playerImage.src = '/assets/gifs/player.gif';
    enemyImage.src = '/assets/gifs/enemy.gif';
    playerImage.onload = checkAllLoaded;
    enemyImage.onload = checkAllLoaded;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenhar jogador e inimigo
      ctx.drawImage(playerImage!, playerX, playerY, playerWidth, playerHeight);
      ctx.drawImage(enemyImage!, enemyX, enemyY, enemyWidth, enemyHeight);

      requestAnimationFrame(gameLoop);
    };
  }, []);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
}
