import type { ITimestamp } from './common.d.ts';

interface IProduct extends ITimestamp {
  id: number;
  name: string;
  description: string|null;
  price: number;
  banner: string|null;
  userId: number;
}