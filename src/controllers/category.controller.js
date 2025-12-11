import { getConnection } from "../db/connection.js";

// obtener todas las categorías
export const getCategories = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM categories";
    const [rows] = await connection.query(query);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener categorías" });
  } finally {
    if (connection) connection.release();
  }
};

// obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const query = "SELECT * FROM categories WHERE id = ?";
    const [rows] = await connection.query(query, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  } finally {
    if (connection) connection.release();
  }
};

// crear una categoría
export const createCategory = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();
    const { name, user_id } = req.body;

    const query = `
      INSERT INTO categories (name, user_id, created_at)
      VALUES (?, ?, NOW())
    `;

    const [result] = await connection.query(query, [name, user_id]);

    res.status(201).json({
      id: result.insertId,
      name,
      user_id,
      created_at: new Date()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear categoría" });
  } finally {
    if (connection) connection.release();
  }
};

// actualizar una categoría
export const updateCategory = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();
    const { name, user_id } = req.body;
    const { id } = req.params;

    const selectQuery = "SELECT * FROM categories WHERE id = ?";
    const [rows] = await connection.query(selectQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    const updatedName = name ?? rows[0].name;
    const updatedUserId = user_id ?? rows[0].user_id;

    const updateQuery = `
      UPDATE categories 
      SET name = ?, user_id = ?
      WHERE id = ?
    `;

    await connection.query(updateQuery, [
      updatedName,
      updatedUserId,
      id
    ]);

    res.json({
      id,
      name: updatedName,
      user_id: updatedUserId,
      created_at: rows[0].created_at
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  } finally {
    if (connection) connection.release();
  }
};

// eliminar una categoría
export const deleteCategory = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const selectQuery = "SELECT * FROM categories WHERE id = ?";
    const [rows] = await connection.query(selectQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    const deleteQuery = "DELETE FROM categories WHERE id = ?";
    await connection.query(deleteQuery, [id]);

    res.json({ message: "Categoría eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar categoría" });
  } finally {
    if (connection) connection.release();
  }
};
