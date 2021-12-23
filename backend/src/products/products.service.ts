import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './products.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private productsRepository: Repository<Products>
    ) { }
    async getAllProducts(): Promise<Products[]> {
        return this.productsRepository.find();
    }
    async createNewProduct(bo: CreateProductDto): Promise<Products> {
        return this.productsRepository.save(bo);
    }
    async getProductsById(id: number): Promise<Products> {
        return this.productsRepository.findOneOrFail(id)
    }
    async deleteProductsById(id: number): Promise<Products[]> {
        const product = await this.productsRepository.delete(id);
        return this.productsRepository.find();
    }
}
