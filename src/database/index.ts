import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "database_ignite",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
});

AppDataSource.initialize();
