import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductsService } from 'src/products/products.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Purchase } from './purchase.entity';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
    constructor(
        private readonly purchaseService: PurchaseService,
        private readonly productsService: ProductsService

    ) { }

    @Get()
    getAllPurchases(): Promise<Purchase[]> {
        return this.purchaseService.getAllPurchases();
    }
    @Post()
    async createNewPurchase(@Body() body: CreatePurchaseDto): Promise<Purchase> {
        //const getProduct = await this.productsService.getOneProduct(body.products.id);
        //body.products = getProduct;
        return this.purchaseService.createNewPurchase(body);
    }
}
