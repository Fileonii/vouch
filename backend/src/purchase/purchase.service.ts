import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Purchase } from './purchase.entity';

@Injectable()
export class PurchaseService {
    constructor(
        @InjectRepository(Purchase)
        private purchaseRepository: Repository<Purchase>
    ) { }
    getAllPurchases(): Promise<Purchase[]> {
        return this.purchaseRepository.find({ relations: ['products'] });
    }
    async createNewPurchase(body: CreatePurchaseDto): Promise<Purchase> {
        try {
            return this.purchaseRepository.save(body);
        } catch (error) {
            throw (error);
        }
    }
}
