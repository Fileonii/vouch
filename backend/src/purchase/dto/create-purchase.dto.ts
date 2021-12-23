import { Products } from "src/products/products.entity";

export class CreatePurchaseDto {
    buyer: string;
    seller: string;
    products: Products[];
}
