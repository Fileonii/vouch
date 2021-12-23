import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { PurchaseModule } from './purchase/purchase.module';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    PurchaseModule,
    ProductsModule,
  ],
})
export class AppModule { }
