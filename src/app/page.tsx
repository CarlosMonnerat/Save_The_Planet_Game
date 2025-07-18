import Link from 'next/link';
import BackgroundHome from '@/components/BackgroundHome';

export default function Home() {
  return (
    <BackgroundHome imageUrl="/assets/image/home-bg.svg">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest text-neon-blue mb-10 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-pulse">
        Save The Planet
      </h1>

      <Link href="/game">
        <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-800 hover:from-cyan-400 hover:to-blue-700 text-white text-xl font-semibold tracking-wider rounded-full cursor-pointer shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.7)] transition duration-300 ease-in-out">
           Jogar
        </button>
      </Link>
    </BackgroundHome>
  );
}
