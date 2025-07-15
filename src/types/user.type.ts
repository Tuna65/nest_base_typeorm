import { EStatus } from 'src/enums/EStatus';
import { IPaginationQuery } from '.';

export class BodyLogin {
  email: string;

  password: string;

  shopAlias: string;
}

export interface QueryUser extends IPaginationQuery {
  full_name: string;
  employee_code: string;
  key_word: string;
  status: EStatus;
}
