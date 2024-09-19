import { Controller, Get, Param, NotFoundException, Post, Body, Patch, Delete,BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { NewProductDTO } from './dto/newProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return await this.productService.getAll();
  };

  @Get('/active')
  async getActiveProducts(): Promise<Product[]> {
    return await this.productService.getActiveProducts();
  };

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Product> {
    return await this.productService.getById(id);
  };

  @Get('/category/:id')
  async getByCategory(@Param('id') id: string): Promise<Product[]> {
    return await this.productService.getByCategory(id);
  };

  @Post()
  async newProduct(@Body() data: NewProductDTO): Promise<Product> {
    return this.productService.create(data);
  };

  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updates: UpdateProductDto[],
  ) {
    if (!updates || updates.length === 0) {
      throw new BadRequestException('No se proporcionaron actualizaciones');
    }
    
    try {
      const updatedProduct = await this.productService.updateProduct(id, updates);
      return updatedProduct;
    } catch (error) {
      // Puedes manejar errores específicos aquí si es necesario
      throw new NotFoundException('Producto no encontrado');
    }
  };

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return await this.productService.deleteProduct(id);
  };
  
}
