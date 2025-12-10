import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL =", process.env.DATABASE_URL);

import { Sequelize } from "sequelize";

if (!process.env.DB_HOST) {
  throw new Error("DATABASE_URL is not defined");
}

export const sequelize = new Sequelize(process.env.DB_HOST, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // obligatorio para Supabase
    },
  },
});

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Error", error);
  }
}

dbConnect();
