import { ArrayNotEmpty, IsNotEmpty } from "class-validator";
import { Products } from "src/products/products.entity";

export class CreatePurchaseDto {
    @IsNotEmpty()
    buyer: string;
    @IsNotEmpty()
    seller: string;
    @ArrayNotEmpty()
    products: Products[];
}
