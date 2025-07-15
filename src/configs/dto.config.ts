import { ClassConstructor, plainToInstance } from 'class-transformer';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { BaseDTO } from 'src/base/dto.base';
import { BaseEntity } from 'src/base/entity.base';

export const mapToDto = <T>(cls: ClassConstructor<T>, entity: any) => {
  return plainToInstance(cls, entity, {
    excludeExtraneousValues: true,
  });
};

export function mapToEntity<T extends BaseEntity, D extends BaseDTO>(
  entity: T,
  body: D,
) {
  return Object.assign(entity, body);
}

export const MapPaginate = <T extends BaseEntity, D extends BaseDTO>(
  data: Pagination<T, IPaginationMeta>,
  cls: ClassConstructor<D>,
) => {
  return {
    meta: data.meta,
    items: data.items.map((i) => mapToDto(cls, i)),
  };
};
