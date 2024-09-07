import { Controller, Get, Param, NotFoundException, Post, Body, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { NewProductDTO } from './dto/newProduct.dto';
import { UpdateFieldDTO } from './dto/updateProduct.dto';

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

  @Post()
  async newProduct(@Body() data: NewProductDTO): Promise<Product> {
    return this.productService.create(data);
  }

  @Patch('/:id')
  async updateProduct(
    @Body() data: UpdateFieldDTO,
    @Param('id') id: string
  ): Promise<Product> {
    return await this.productService.updateField(id, data.fieldName, data.fieldValue);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return await this.productService.deleteProduct(id);
  }
  
}
