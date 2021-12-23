import { Products } from 'src/products/products.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    buyer: string;
    @Column()
    seller: string;
    @ManyToMany(() => Products, { cascade: true })
    @JoinTable()
    products: Products[];
}
