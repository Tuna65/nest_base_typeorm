import { BaseEntity } from 'src/base/entity.base';
import { Product } from 'src/entity/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @Column({ length: 500 })
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @OneToMany((type) => Product, (product) => product.user)
  products?: Product[];
}
