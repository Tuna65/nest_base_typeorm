import { BaseEntity } from 'src/base/entity.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column({ length: 500 })
  name: string;

  @Column()
  quantity: number;
}
