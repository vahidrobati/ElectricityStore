import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class SignupDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsNumber()
  role_id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productKey?: string;
}

export class SigninDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}

export class GenerateProductKeyDto {
  @IsString()
  userName: string;

  @IsNumber()
  role_id: number;
}
