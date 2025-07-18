'use client';

import dynamic from 'next/dynamic';

const GameCanvas = dynamic(() => import('@/components/GameCanvas'), { ssr: false });

export default function GameClientPage() {
  return (
    <main className="flex items-center justify-center h-screen bg-black">
      <GameCanvas />
    </main>
  );
}
