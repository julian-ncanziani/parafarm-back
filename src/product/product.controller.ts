import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]>{
    return await this.productService.getAll();
  }

  @Get('/:name')
  async getByName(@Param('name') name: string): Promise<Product> {
    return await this.productService.getByName(name);
  }

  @Get('/category/:id')
  async getByCategory(@Param('id') id: string): Promise<Product[]> {
    return await this.productService.getByCategory(id);
  }
}
