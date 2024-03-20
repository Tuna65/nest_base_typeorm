import { BaseEntity } from 'src/base/entity.base';
import { EStatus } from 'src/enums/EStatus';
import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column()
  status?: EStatus;

  @OneToMany((type) => Product, (product) => product.user)
  products?: Product[];
}
