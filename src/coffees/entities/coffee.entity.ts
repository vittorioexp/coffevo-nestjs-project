import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";
import { User } from "../../users/entities/user.entity";
import { Rate } from "./rate.entity";

@Entity()
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    brand: string;

    @OneToMany(
        type => Rate,
        rate => rate.coffee,
        { cascade: true }
    )
    rates: Rate[];

    @Column({ default: false })
    isPublished: boolean;

    @ManyToOne(
        type => User,
        user => user.coffees
    )
    inventor: User;

    @JoinTable() // 👈 Join the 2 tables - only the OWNER-side does this
    @ManyToMany(
        type => Flavor,
        flavor => flavor.coffees, // what is "coffee" within the Flavor Entity 
        {
            cascade: true
        }
    ) 
    flavors: Flavor[];

}