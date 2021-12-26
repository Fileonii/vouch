import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    type: string;
}