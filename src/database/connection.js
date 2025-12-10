import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Evita múltiples conexiones en serverless
let sequelize;

if (!global._sequelize) {
  global._sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: Number(process.env.DB_PORT),
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        family: 4,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
}

sequelize = global._sequelize;

export { sequelize };
