import { Product } from 'src/entity/product.entity';

export type UserDTO = {
  name: string;
  email: string;
  password: string;
  id?: number;
  products?: Product[];
};
