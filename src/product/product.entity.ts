import { BaseEntity } from 'src/base/entity.base';
import { EStatus } from 'src/enums/EStatus';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  quantity: number;

  @Column()
  status?: EStatus;

  @ManyToOne((type) => User, (user) => user.products)
  user?: User;
}
