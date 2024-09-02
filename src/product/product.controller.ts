import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]>{
    return this.productService.getAll();
  }

  @Get('/:name')
  async getByName(@Param('name') name: string): Promise<Product> {
    return this.productService.getByName(name);
  }
}
