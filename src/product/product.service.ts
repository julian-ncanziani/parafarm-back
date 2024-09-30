import { 
    Injectable, 
    NotFoundException, 
    BadRequestException, 
    InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { NewProductDTO } from './dto/newProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { BulkUpdateDto } from './dto/bulkupdate.dto';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){};


    async getAll(): Promise<Product[]>{
        try {
            return await this.productModel.find();           
        } catch (error) {
            throw('Error product service getAll.' + error.message)
        }
    };


    async getByName(name): Promise<Product> {
        try {
            const regex = new RegExp(`^\\s*${name}\\s*$`, 'i')
            const product = await this.productModel.findOne({name: regex})
            if(!product) throw new NotFoundException('Producto no encontrado')
            return product;
        } catch (error) {
            throw(error)
        }
    };


    async getById(id: string): Promise<Product> {
        try {
            const product = await this.productModel.findById(id);
            if(!product) throw new NotFoundException('Producto no encontrado');
            return product;
        } catch (error) {
            throw('Error product service getById.' + error.message)
        }
    };


    async getByCategory(category: string): Promise<Product[]> {
        try {
            return await this.productModel.find({category_id: category})
        } catch (error) {
            throw('Error product service getByCAtegory.' + error.message)
        }
    };


    async create(data: NewProductDTO): Promise<Product> {
        try {
            return await this.productModel.create(data)           
        } catch (error) {
            console.log(error.message)
            throw('Error product service create.' + error.message)
        }
    };


    async updateProduct(id: string, updates: UpdateProductDto[]): Promise<Product> {

        const updateObject = updates.reduce((acc, update) => {
          const { field, value, valueNumber } = update;
    
          // Validación básica para evitar campos vacíos o nulos
          if (!field) {
            throw new BadRequestException(`Campo no especificado`);
          }
    
          // Validar que el valor sea adecuado para el campo
          if (field === 'price' && valueNumber !== undefined) {
            if (valueNumber <= 0) {
              throw new BadRequestException(`El precio debe ser mayor a cero`);
            }
            acc[field] = valueNumber;
          } else if (field === 'stock' && valueNumber !== undefined) {
            if (valueNumber < 0) {
              throw new BadRequestException(`El stock no puede ser negativo`);
            }
            acc[field] = valueNumber;
          } else if (value !== undefined) {
            acc[field] = value;
          } else {
            throw new BadRequestException(`Valor inválido para el campo ${field}`);
          }
    
          return acc;
        }, {});

        // Buscar y actualizar el producto
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateObject, {
          new: true,
          runValidators: true,
        });
    
        if (!updatedProduct) {
          throw new NotFoundException('Producto no encontrado');
        }
    
        return updatedProduct;
    };


    async deleteProduct(id: string): Promise<Product> {
        try {
            return await this.productModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error product service deleteProduct: ' + error.message);
        }
    };


    async getActiveProducts(): Promise<Product[]> {
        try {           
            return await this.productModel.find({active: true});
        } catch (error) {
            throw new Error('Error product service getActiveproducts: ' + error.message);
        }
    };

    async updateMany(bulkUpdateDto: BulkUpdateDto) {
        const { productIds, price, active } = bulkUpdateDto;

        const updateFields: any = {};

        // Si se incluye el campo `active`, agregamos la actualización a los campos
        if (active !== undefined) {
        updateFields.active = active;
        }

        // Si `price` está presente, actualizamos el precio
        if (price) {
            const { amount, percentaje } = price;

            if (percentaje) {
                // Si percentage es true, actualiza el precio basado en porcentaje sobre el valor actual
                const products = await this.productModel.find({ _id: { $in: productIds } });

                for (const product of products) {
                const newPrice = product.price * (1 + amount / 100);
                updateFields.price = newPrice;

                await this.productModel.updateOne(
                    { _id: product._id },
                    { $set: updateFields }
                );
                }

                return { message: 'Productos actualizados con porcentaje sobre el precio actual y campo active (si aplica)' };
                } else {
                    // Si percentage es false o no está presente, actualiza el precio directamente
                    updateFields.price = amount;
                }
        }

        // Realiza la actualización de todos los productos con los campos correspondientes
        return this.productModel.updateMany(
            { _id: { $in: productIds } },
            { $set: updateFields }
        );
    };


};
