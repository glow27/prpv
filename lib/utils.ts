import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fileId =
  '2PACX-1vQ4Dy7CibplSQcLKhURJpgB-Wtl-oEj9yxvjyer3W23_4rcHXtkQccWcHPvCdQyqR7dfcv-G8eFM7q9';

function randomNum() {
  return Math.floor(Math.random() * 255 + 1);
}

export function generateColor() {
  return `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
}
