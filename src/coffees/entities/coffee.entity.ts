import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, SelectQueryBuilder } from "typeorm";
import { Flavor } from "./flavor.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    brand: string;

    @Column({default: 0})
    reccomendations: number;
    
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

    // Add a static method to modify the SELECT query when fetching the coffee entity
    static withRelations(query: SelectQueryBuilder<Coffee>): SelectQueryBuilder<Coffee> {
        return query.leftJoinAndSelect("coffee.inventor", "inventor").select([
            "coffee.id",
            "coffee.name",
            "coffee.brand",
            "coffee.recommendations",
            "coffee.isPublished",
            "flavors",
            "inventor.id",
            "inventor.username",
        ]);
    }
}