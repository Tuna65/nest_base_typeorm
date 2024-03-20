import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EStatus } from 'src/enums/EStatus';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';

@Injectable({})
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: UserDTO) {
    const user = await this.userRepository.findOne({
      where: { email: userDTO.email },
    });

    if (user) throw new NotFoundException('Email đã tồn tại!');

    const newUser: User = { ...userDTO };
    newUser.status = EStatus.ACTIVE;

    await this.userRepository.create({
      ...newUser,
    });

    return this.userRepository.save(newUser);
  }

  async findAll(user: User): Promise<User[]> {
    return this.userRepository.find({ where: { name: user.name ?? '' } });
  }

  async detail(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
