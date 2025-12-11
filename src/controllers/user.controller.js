import { getConnection } from "../db/connection.js";
import bcrypt from "bcrypt";


// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM users";
    const [users] = await connection.query(query);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  } finally {
    if (connection) connection.release();
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await connection.query(query, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  } finally {
    if (connection) connection.release();
  }
};

// Crear usuario
export const createUser = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { name, email, password } = req.body;

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())";

    const [result] = await connection.query(query, [
      name,
      email,
      hashedPassword
    ]);

    res.status(201).json({
      id: result.insertId,
      name,
      email,
      password: undefined, // no devolver contraseña
      created_at: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  } finally {
    if (connection) connection.release();
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params;
    const { name, email, password } = req.body;

    const checkQuery = "SELECT * FROM users WHERE id = ?";
    const [rows] = await connection.query(checkQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const query =
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";

    await connection.query(query, [
      name ?? rows[0].name,
      email ?? rows[0].email,
      password ?? rows[0].password,
      id
    ]);

    res.json({
      id,
      name: name ?? rows[0].name,
      email: email ?? rows[0].email,
      password: password ?? rows[0].password
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  } finally {
    if (connection) connection.release();
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "DELETE FROM users WHERE id = ?";
    const [result] = await connection.query(query, [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  } finally {
    if (connection) connection.release();
  }
};
