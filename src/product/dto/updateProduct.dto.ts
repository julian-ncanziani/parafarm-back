import { IsOptional, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  field: string; // Campo que se quiere actualizar (ej. "price", "stock")

  @IsOptional()
  @IsString()
  value?: string; // Valor de tipo string si es necesario

  @IsOptional()
  @IsNumber()
  valueNumber?: number; // Valor de tipo number si es necesario
}
