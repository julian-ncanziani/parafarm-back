import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsObject } from 'class-validator';

export class UpdateFieldDTO {

    @IsString()
    @IsNotEmpty()
    fieldName: string;

    @IsNotEmpty()
    fieldValue: boolean | string | number;

}