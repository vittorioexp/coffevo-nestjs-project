import { Coffee } from "../../coffees/entities/coffee.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    User = 'user',
    Admin = 'admin',
  }

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, enum: Role, default: Role.User })
    role: Role;

    @OneToMany(
        type => Coffee,
        coffee => coffee.inventor
    )
    coffees: Coffee[]
}