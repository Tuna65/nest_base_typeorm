import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EStatus } from 'src/enums/EStatus';
import { Product } from '../entity/product.entity';

@Injectable({})
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async create(body: any) {
    return this.productRepository.save(body);
  }
}
