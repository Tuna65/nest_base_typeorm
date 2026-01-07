import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user.entity';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private accountService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(body: any) {
    const { username, password } = body;
    const user: any = await this.accountService.validateUser(
      username,
      password,
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const dataSign = { ...user };
    const token = await this.jwtService.sign(dataSign, {
      expiresIn: 1000 * 60 * 60,
    });

    return {
      access_token: token,
      user,
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
