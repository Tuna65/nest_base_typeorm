import { EStatus } from 'src/enums/EStatus';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt?: Date;

  @Column({ nullable: true })
  createdBy?: number;

  @Column({ nullable: true, default: EStatus.ACTIVE })
  status: EStatus;

  @PrimaryGeneratedColumn()
  id?: number;
}
