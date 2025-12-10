import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

// Opción 1: Usando URL completa (recomendado)
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // necesario para Supabase
    },
  },
});

// Opción 2: Usando variables separadas
/*
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);
*/

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Error", error);
  }
}

dbConnect();
