import { CoffeeRefactor1680094086577 } from "src/migration/1680094086577-CoffeeRefactor";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres', // type of our database
    host: process.env.DATABASE_HOST, // database host
    port: +process.env.DATABASE_PORT, // database host
    username: process.env.DATABASE_USER, // username
    password: process.env.DATABASE_PASSWORD, // user password
    database: process.env.DATABASE_NAME, // name of our database,
    entities: [],
    migrations: [CoffeeRefactor1680094086577],
  });