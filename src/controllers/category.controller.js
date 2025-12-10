import { Category } from "../models/Category.js";

// obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};

// obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

// crear una categoría
export const createCategory = async (req, res) => {
  try {
    const { name, user_id } = req.body;

    const newCategory = await Category.create({
      name,
      user_id,
      created_at: new Date()
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Error al crear categoría" });
  }
};

// actualizar una categoría
export const updateCategory = async (req, res) => {
  try {
    const { name, user_id } = req.body;

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    category.name = name ?? category.name;
    category.user_id = user_id ?? category.user_id;

    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

// eliminar una categoría
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    await category.destroy();
    res.json({ message: "Categoría eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar categoría" });
  }
};
