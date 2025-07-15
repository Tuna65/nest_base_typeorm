import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QueryUser } from 'src/types/user.type';
// import { Authorization } from 'src/decorators/auth.decorator';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  // @Authorization(true)
  create(@Body() body: any) {
    return this.userService.create(body);
  }

  @Get()
  // @Authorization(true)
  getall(@Query() query: QueryUser) {
    const newQuery: QueryUser = {
      ...query,
      page: query.page ?? 1,
      limit: query.limit ?? 20,
    };
    return this.userService.find(newQuery);
  }

  @Get('/get-by-username')
  // @Authorization(true)
  detailByUserName(@Query() query: { username: string }) {
    return this.userService.getByUserName(query.username);
  }

  @Get(':id')
  // @Authorization(true)
  detail(@Param('id') id: number) {
    return this.userService.detail(id);
  }

  @Delete('/delete-multiple')
  // @Authorization(true)
  deleteMultiple(@Body() body: { ids: number[] }) {
    return this.userService.deleteMultiple(body.ids);
  }

  @Delete(':id')
  // @Authorization(true)
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Put()
  // @Authorization(true)
  update(@Body() user: User) {
    return this.userService.update(user.id, user);
  }
}
