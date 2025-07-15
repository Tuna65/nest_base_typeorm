import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { mapToDto } from 'src/configs/dto.config';

import { UnauthorizedException } from '@nestjs/common/exceptions';
import { NotFoundException } from 'src/configs/exception.config';
import { EStatus } from 'src/enums/EStatus';
import { User } from 'src/entity/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private accountService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(body: any) {
    const { username, password } = body;

    const user = await this.accountService.findByUsername(username);
    if (!user)
      return NotFoundException('Tài khoản hoặc mật khẩu không chính xác!');

    if (user.status == EStatus.INACTIVE)
      throw new UnauthorizedException({
        error: '401 - Unauthorized',
        message: 'Tài khoản của bạn đã bị khóa!',
      });

    if (user.status == EStatus.DELETED)
      throw new UnauthorizedException({
        error: '401 - Unauthorized',
        message: 'Tài khoản của bạn đã bị xóa!',
      });

    const isMatch = password === user.password;
    // const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NotFoundException('Tài khoản hoặc mật khẩu không chính xác!');
    const { id } = user;
    const dataSign = {
      id,
    };
    return {
      ...dataSign,
      accessToken: await this.jwtService.sign(dataSign, {
        expiresIn: 1000 * 60 * 60,
      }),
    };
  }

  async getUserByToken(token: string): Promise<User> {
    const user: any = this.jwtService.decode(token, { json: true });
    if (user) {
      const entity = await this.accountService.detail(user.id);
      const data = { ...entity };
      delete data.password;
      return data;
    }
  }
}
