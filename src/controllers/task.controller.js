import { Task } from "../models/Task.js";

// Obtener todas las tareas
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

// Obtener tarea por ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tarea" });
  }
};

// Crear una tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, status, due_date, category_id, user_id } =
      req.body;

    const newTask = await Task.create({
      title,
      description,
      status,
      due_date,
      category_id,
      user_id,
      created_at: new Date()
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const { title, description, status, due_date, category_id, user_id } =
      req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.due_date = due_date ?? task.due_date;
    task.category_id = category_id ?? task.category_id;
    task.user_id = user_id ?? task.user_id;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    await task.destroy();
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};
