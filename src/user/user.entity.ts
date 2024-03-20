import { BaseEntity } from 'src/base/base.entity';
import { EStatus } from 'src/enums/EStatus';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
}
