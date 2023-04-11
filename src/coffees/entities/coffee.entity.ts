import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";

@Entity()
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column({default: 0})
    reccomendations: number;

    @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
    @ManyToMany(
        type => Flavor,
        flavor => flavor.coffees, // what is "coffee" within the Flavor Entity 
        {
            cascade: true
        }
    ) // 👈
    flavors: Flavor[];
}