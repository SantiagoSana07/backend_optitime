import { Exception } from "../models/Exception.js";

// Obtener todas las excepciones
export const getExceptions = async (req, res) => {
  try {
    const exceptions = await Exception.findAll();
    res.json(exceptions);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener excepciones" });
  }
};

// Obtener excepción por ID
export const getExceptionById = async (req, res) => {
  try {
    const exception = await Exception.findByPk(req.params.id);

    if (!exception) {
      return res.status(404).json({ error: "Excepción no encontrada" });
    }

    res.json(exception);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la excepción" });
  }
};

// Crear excepción
export const createException = async (req, res) => {
  try {
    const { task_id, reason, description } = req.body;

    const newException = await Exception.create({
      task_id,
      reason,
      description,
      created_at: new Date()
    });

    res.status(201).json(newException);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la excepción" });
  }
};

// Actualizar excepción
export const updateException = async (req, res) => {
  try {
    const exception = await Exception.findByPk(req.params.id);

    if (!exception) {
      return res.status(404).json({ error: "Excepción no encontrada" });
    }

    const { task_id, reason, description } = req.body;

    exception.task_id = task_id ?? exception.task_id;
    exception.reason = reason ?? exception.reason;
    exception.description = description ?? exception.description;

    await exception.save();

    res.json(exception);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la excepción" });
  }
};

// Eliminar excepción
export const deleteException = async (req, res) => {
  try {
    const exception = await Exception.findByPk(req.params.id);

    if (!exception) {
      return res.status(404).json({ error: "Excepción no encontrada" });
    }

    await exception.destroy();

    res.json({ message: "Excepción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la excepción" });
  }
};
