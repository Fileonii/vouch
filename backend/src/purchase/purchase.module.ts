import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { PurchaseController } from './purchase.controller';
import { Purchase } from './purchase.entity';
import { PurchaseService } from './purchase.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase]),
    ProductsModule
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService]
})
export class PurchaseModule { }
