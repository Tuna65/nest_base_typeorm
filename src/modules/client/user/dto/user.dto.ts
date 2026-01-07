import { Expose } from 'class-transformer';
import { BaseDTO } from 'src/base/dto.base';
import { EStatus } from 'src/enums/EStatus';

export class UserDTO extends BaseDTO {
  @Expose()
  username: string;

  password: string;

  @Expose()
  role: string;

  @Expose()
  employee_code?: string;

  @Expose()
  full_name: string;

  @Expose()
  department?: string;

  @Expose()
  position?: string;

  @Expose()
  email: string;
  
  @Expose()
  status: EStatus;
}
