import { Expose } from 'class-transformer';

export class BaseDTO {
  @Expose()
  id: number;

  @Expose()
  createdAt?: Date;

  @Expose()
  createdBy: Date;

  @Expose()
  updateAt?: Date;

  deletedAt?: Date;
}
