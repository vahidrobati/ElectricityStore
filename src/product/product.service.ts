import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private readonly prismaService:PrismaService){}

    async getProducts(){
        return await this.prismaService.product.findMany();
    }

    async getProductById(productId: number){
        return await this.prismaService.product.findUnique({
            where: {
                id: productId
            }
        })
    }
}
