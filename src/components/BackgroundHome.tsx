import { ReactNode } from 'react';

type BackgroundHomeProps = {
  children: ReactNode;
  imageUrl: string;
};

export default function BackgroundHome({ children, imageUrl }: BackgroundHomeProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />

      {/* Overlay com transparência correta */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)]" />

      {/* Conteúdo da página */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        {children}
      </div>
    </div>
  );
}

