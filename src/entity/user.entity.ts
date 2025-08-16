import { BaseEntity } from 'src/base/entity.base';
import { Column, Entity } from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @Column({ length: 500 })
  username: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;
}
