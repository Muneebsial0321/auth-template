import { useState } from 'react';
import type { HomeType } from './home.type';

export function useHome() {
  const [data, setData] = useState<HomeType[]>([]);
  return { data, setData };
}