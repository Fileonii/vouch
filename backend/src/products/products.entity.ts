import { Purchase } from 'src/purchase/purchase.entity';
import {
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    type: string;

}
