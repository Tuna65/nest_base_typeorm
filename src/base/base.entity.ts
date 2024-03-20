import { EStatus } from 'src/enums/EStatus';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @Column({ length: 500 })
  createdAt?: Date;

  @Column('text')
  updateAt?: Date;

  @Column('text')
  createdBy?: Number;
}
