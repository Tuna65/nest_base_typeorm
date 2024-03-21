import { Column } from 'typeorm';

export class BaseEntity {
  @Column()
  createdAt?: Date;

  @Column()
  updateAt?: Date;

  @Column()
  createdBy?: number;
}
