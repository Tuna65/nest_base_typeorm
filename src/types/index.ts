export type TMsgResponse = {
  status: boolean;
  message: string;
};

export interface Pagination<T> {
  items: T[];
  meta: IPaginationMeta;
}

export class PaginationDTO {
  page = 1;
  limit = 20;
}

export interface IPaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IPaginationQuery {
  page?: number;
  limit?: number;
}
