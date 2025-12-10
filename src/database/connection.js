import dotenv from "dotenv"
dotenv.config()

import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: {
      family: 4
    }
  }
)

async function dbConnect() {
  try {
    await sequelize.authenticate()
    console.log("DB Connected")
  } catch (error) {
    console.error("DB Error", error)
  }
}

dbConnect()
