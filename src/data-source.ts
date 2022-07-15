import "reflect-metadata";
import { DataSource } from "typeorm";

import dotenv from "dotenv";

dotenv.config();

const appDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
      type: "sqlite",
      database: ":memory:",
      entities: ["src/entities/*.ts"],
      synchronize: true,
    })
    : new DataSource({
      type: "postgres",
      url: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ?
        { rejectUnauthorized: false }
        : false,
      synchronize: false,
      entities: process.env.NODE_ENV === "production"
        ? ["dist/src/entities/*.js"]
        : ["src/entities/*.ts"],
      migrations: process.env.NODE_ENV === "production"
        ? ["dist/src/migrations/*.js"]
        : ["src/migrations/*.ts"],
    });

export default appDataSource;
