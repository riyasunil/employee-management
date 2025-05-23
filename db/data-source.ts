import "reflect-metadata"
import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import Employee from "../entities/employee.entity"
import Address from "../entities/address.entity"
import 'dotenv/config'
import Department from "../entities/department.entity"

const datasource = new DataSource ({
    type : "postgres",
    host : "localhost",
    port : 5432,
    database : "training",
    username : "postgres",
    password : process.env.DB_PASSWORD, //postgres
    extra: {max: 5, min:2},
    synchronize: false, //when sync is turned to true, the db gets popuated if its required to by typeorm. this is disruptive to the workflow so we never turn it true
    logging : true,
    namingStrategy : new SnakeNamingStrategy,
    entities: [Employee, Address, Department],
    migrations: ["dist/db/migrations/*.js"] //typeorm needs the build version --> the ones in dist
})

export default datasource