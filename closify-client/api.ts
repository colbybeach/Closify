import axios from 'axios';
import { ClothingItem } from './types';

export const getClothing = async (): Promise<ClothingItem[]> => {
  const response = await axios.get('/read');
  return response.data;
};