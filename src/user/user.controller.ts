import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: UserDTO) {
    return this.userService.create(user);
  }

  @Get('get-all')
  getall(@Param() user: User) {
    return this.userService.findAll(user);
  }

  @Get(':id')
  detail(@Param('id') id: number) {
    return this.userService.detail(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }
}
