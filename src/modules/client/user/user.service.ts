import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { mapToDto } from 'src/configs/dto.config';
import {
  ConflictException,
  NotFoundException,
} from 'src/configs/exception.config';
import { User } from 'src/entity/user.entity';
import { EStatus } from 'src/enums/EStatus';
import { Pagination } from 'src/types';
import { QueryUser } from 'src/types/user.type';
import {
  addEmployeeCodeFilter,
  addFullNameFilter,
  addKeywordFilter,
  mapMetaData,
} from 'src/utils/func';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserDTO } from './dto/user.dto';

@Injectable({})
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(dto: any) {
    const entity = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    if (entity) return ConflictException('Tài khoản đã tồn tại');

    dto.id = uuidv4().toString();
    dto.password = await bcrypt.hash(dto.password, 12);
    return mapToDto(UserDTO, await this.userRepository.save(dto));
  }

  private buildWhereConditions(qb: any, alias: string, query: QueryUser): void {
    const { employee_code, full_name, key_word, status } = query;

    qb.where(`${alias}.status != :deletedStatus`, {
      deletedStatus: EStatus.DELETED,
    });

    if (employee_code) {
      addEmployeeCodeFilter(qb, alias, employee_code);
    }

    if (full_name) {
      addFullNameFilter(qb, alias, full_name);
    }

    if (key_word) {
      addKeywordFilter(qb, alias, key_word);
    }

    if (status) {
      qb.andWhere(`${alias}.status = :queryStatus`, {
        queryStatus: status,
      });
    }
  }

  private async getTotalCount(query: QueryUser): Promise<number> {
    const totalCountQueryBuilder =
      this.userRepository.createQueryBuilder('user_count');
    this.buildWhereConditions(totalCountQueryBuilder, 'user_count', query);
    return await totalCountQueryBuilder.getCount();
  }

  private async getFilteredItems(query: QueryUser): Promise<User[]> {
    const itemsQueryBuilder: SelectQueryBuilder<User> =
      this.userRepository.createQueryBuilder('user');

    this.buildWhereConditions(itemsQueryBuilder, 'user', query);
    itemsQueryBuilder.leftJoinAndSelect('user.groups', 'group');
    itemsQueryBuilder.orderBy('user.id', 'ASC');

    const skip = (query.page - 1) * query.limit;
    itemsQueryBuilder.skip(skip);
    itemsQueryBuilder.take(query.limit);

    return await itemsQueryBuilder.getMany();
  }

  async find(query: QueryUser): Promise<Pagination<User>> {
    const [totalItems, items] = await Promise.all([
      this.getTotalCount(query),
      this.getFilteredItems(query),
    ]);

    const meta = mapMetaData(
      totalItems,
      items.length,
      Number(query.limit),
      Number(query.page),
    );

    return { meta, items };
  }

  async findByUsername(username: string) {
    const queryBuilder: SelectQueryBuilder<User> =
      this.userRepository.createQueryBuilder('user');
    queryBuilder.where('user.username = :username', { username });
    return await queryBuilder.getOne();
  }

  async detail(id: number): Promise<User> {
    const queryBuilder: SelectQueryBuilder<User> =
      this.userRepository.createQueryBuilder('user');
    queryBuilder.where('user.id = :id', { id });
    queryBuilder.leftJoinAndSelect('user.groups', 'group');
    return await queryBuilder.getOne();
  }

  async getByUserName(username: string): Promise<User> {
    const queryBuilder: SelectQueryBuilder<User> =
      this.userRepository.createQueryBuilder('user');
    queryBuilder.where('user.username = :username', { username });
    queryBuilder.leftJoinAndSelect('user.groups', 'group');
    return await queryBuilder.getOne();
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    return await this.userRepository.save({});
  }

  async delete(id: number): Promise<any> {
    const user = await this.userRepository.findOneBy({ id });
    await this.userRepository.save({ ...user, status: EStatus.DELETED });
    return { mess: 'Delete success!' };
  }

  async deleteMultiple(ids: number[]): Promise<any> {
    const queryBuilder: SelectQueryBuilder<User> =
      this.userRepository.createQueryBuilder('user');
    queryBuilder.whereInIds(ids);
    queryBuilder.orderBy('user.id', 'DESC');
    const entities = await queryBuilder.getMany();
    await this.userRepository.save(
      entities.map((e) => ({ ...e, status: EStatus.DELETED })),
    );
    return { mess: 'Delete success!' };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) return NotFoundException('Tài khoản, mật khẩu không chính xác!');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return ConflictException('Tài khoản, mật khẩu không chính xác!');

    return mapToDto(UserDTO, user);
  }
}
