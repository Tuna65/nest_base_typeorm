import { BaseDTO } from 'src/base/dto.base';
import { EStatus } from 'src/enums/EStatus';

export interface UserDTO extends BaseDTO {
  username: string;

  password: string;

  role: string;

  employee_code?: string;

  full_name: string;

  department?: string;

  position?: string;

  email: string;
  
  status: EStatus;
}
