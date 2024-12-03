import { ProductCategory, ProductSubCategory } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProductResponseDto {
  id: number;
  Title: string;
  category_id: number;
  subcategory_id: number;
  created_at: Date;
  updated_at: Date;
  constructor(partial: Partial<ProductResponseDto>) {
    Object.assign(this, partial);
  }
}
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  Title: string;

  @IsNumber()
  @IsPositive()
  category_id: number;

  @IsNumber()
  @IsPositive()
  subcategory_id: number;     
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  Title: string;

  @IsNumber()
  @IsPositive()
  category_id: number;

  @IsNumber()
  @IsPositive()
  subcategory_id: number;     
}

