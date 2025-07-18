// Padrão simples (descer verticalmente e reiniciar do topo)
export function verticalFall(y: number, speed: number, screenHeight: number): number {
  const nextY = y + speed;
  return nextY > screenHeight ? 0 : nextY;
}
