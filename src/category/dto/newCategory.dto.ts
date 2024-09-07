import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class NewCategoryDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsOptional()
    readonly description?: string;
}