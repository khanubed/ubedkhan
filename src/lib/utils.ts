import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomRepel(minDist = 12, maxDist = 24) {
  const angle = Math.random() * 2 * Math.PI;
  const distance = minDist + Math.random() * (maxDist - minDist);
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
  };
}
