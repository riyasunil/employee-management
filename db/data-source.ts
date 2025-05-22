import "reflect-metadata"
import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import Employee from "../entities/employee.entity"
import Address from "../entities/address.entity"

const datasource = new DataSource ({
    type : "postgres",
    host : "localhost",
    port : 5432,
    database : "training",
    username : "postgres",
    password : "postgres",
    extra: {max: 5, min:2},
    synchronize: false,
    logging : true,
    namingStrategy : new SnakeNamingStrategy,
    entities: [Employee, Address],
    migrations: ["dist/db/migrations/*.js"] //typeorm needs the build version --> the ones in dist
})

export default datasource