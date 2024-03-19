import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { UserDTO } from './dto/userDTO';

@Injectable({})
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private photoRepository: Repository<User>,
  ) {}

  async create(body: any) {
    return { data: 'hello' };
  }
}
