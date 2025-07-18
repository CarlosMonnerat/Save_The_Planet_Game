import Link from 'next/link';
import BackgroundHome from '@/components/BackgroundHome';

export default function Home() {
  return (
    <BackgroundHome imageUrl="/assets/image/home-bg.svg">
      <h1 className="text-4xl font-bold mb-8 drop-shadow-lg">Save The Planet</h1>
      <Link href="/pages/game">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded text-xl cursor-pointer shadow-md">
          Jogar
        </button>
      </Link>
    </BackgroundHome>
  );
}
