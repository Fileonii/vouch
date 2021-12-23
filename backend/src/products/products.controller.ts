import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productService: ProductsService,
    ) { }

    @Get()
    async getAllProducts(): Promise<Products[]> {
        return this.productService.getAllProducts();
    }
    @Get(":id")
    async getProductsById(@Param('id') id: number): Promise<Products> {
        return this.productService.getProductsById(id);
    }
    @Post()
    async createNewProducts(@Body() body: CreateProductDto): Promise<Products> {
        return this.productService.createNewProduct(body);
    }
    @Delete(":id")
    async deleteProducts(@Param('id') id: number): Promise<Products[]> {
        return this.productService.deleteProductsById(id);
    }
}
