import { IPaginationMeta } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

const checkNullList = <T>(value: T) => {
  if (value == '' || value == null || !value) return true;
  return false;
};

export const jwtConstants = {
  secret: 't65',
};

export const GeneratedId = () => {
  return uuidv4().toString();
};

export function GenerateCode(counter: number, prefix: string) {
  const paddedCounter = String(counter + 1).padStart(5, '0');
  return `${prefix}${paddedCounter}`;
}

