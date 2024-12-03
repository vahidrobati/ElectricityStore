import { Injectable, Body, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

interface SignupParams {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role_id: number;
}

interface SigninParams {
    userName: string;   
    password: string;   
  }


@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup({ userName, email, password,firstName, lastName, phone,role_id }: SignupParams) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        userName
      },
    });

    if (userExists) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
        data: {
            userName,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            role_id
        },
    });

    return this.generateJWT(user.userName, user.id);  
  }

  async signin({ userName, password }: SigninParams) {
    const user = await this.prismaService.user.findUnique({
      where: {
        userName,
      },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    const hashedPassword = user.password;

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', 400);
    }

    return this.generateJWT(user.userName, user.id);
  }

  private generateJWT(userName: string, id: number) {
    return jwt.sign(
      {
        userName,
        id,
      },
      process.env.JSON_TOKEN_KEY,
      {
        expiresIn: 3600000,
      },
    );
  }

  generateProductKey(userName: string, roleId: number) {
    const string = `${userName}-${roleId}-${process.env.PRODUCT_KEY_SECRET}`;

    return bcrypt.hash(string, 10);
  }

}
