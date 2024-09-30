// update-many-products.dto.ts
import { IsArray, IsMongoId, IsNumber, IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// La clase `Price` está ahora dentro del mismo archivo
class Price {
  @IsNumber()
  amount: number;

  @IsBoolean()
  percentaje: boolean;
}

export class BulkUpdateDto {
  @IsArray()
  @IsMongoId({ each: true })
  productIds: string[];

  // Definimos directamente el objeto `price` aquí
  @IsOptional()
  @ValidateNested()
  @Type(() => Price)
  price?: Price;

  @IsOptional()
  @IsBoolean()
  active?: boolean;  // El campo opcional `active`
}

