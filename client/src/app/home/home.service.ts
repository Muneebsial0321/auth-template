import axios from 'axios';
import type { HomeType } from './home.type';

const baseUrl = '/api/home';

export async function getHome(): Promise<HomeType[]> {
  const { data } = await axios.get(baseUrl);
  return data;
}