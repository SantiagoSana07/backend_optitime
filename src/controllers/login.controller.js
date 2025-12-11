import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getConnection } from "../db/connection.js";
import dotenv from "dotenv";
dotenv.config();

const validatePassword = async (inputPassword, storedPassword) => {
  const isValid = await bcrypt.compare(inputPassword, storedPassword);
  return isValid ? true : false;
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.query(
      "SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const foundUser = rows[0];

    const passwordCheck = await validatePassword(password, foundUser.password);

    if (!passwordCheck) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    if (!process.env.SECRET_KEY) {
      return res.status(500).json({ error: "Clave secreta no configurada" });
    }

    const token = generateToken(foundUser);

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al iniciar sesión",
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  } finally {
    if (connection) connection.release();
  }
};
