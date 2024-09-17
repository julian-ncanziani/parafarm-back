import { IsString, IsNumber, IsOptional, IsMongoId, IsNotEmpty, IsBoolean } from 'class-validator';

export class NewProductDTO {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsMongoId() // Asegúrate de validar que sea un ID de MongoDB válido
  @IsOptional()
  category_id?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
