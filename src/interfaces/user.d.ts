import type { ITimestamp } from './common.d.ts';

interface IUser extends ITimestamp {
  id: number;
  fullName: string;
  email: string;
  password: string;
}