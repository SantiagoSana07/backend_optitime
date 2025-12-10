import { DailyJournal } from "../models/DailyJournal.js";

// Obtener todos los diarios
export const getDailyJournals = async (req, res) => {
  try {
    const journals = await DailyJournal.findAll();
    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los diarios" });
  }
};

// Obtener diario por ID
export const getDailyJournalById = async (req, res) => {
  try {
    const journal = await DailyJournal.findByPk(req.params.id);

    if (!journal) {
      return res.status(404).json({ error: "Diario no encontrado" });
    }

    res.json(journal);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el diario" });
  }
};

// Crear un nuevo diario
export const createDailyJournal = async (req, res) => {
  try {
    const { user_id, date, entry, rating } = req.body;

    const newJournal = await DailyJournal.create({
      user_id,
      date,
      entry,
      rating,
      created_at: new Date()
    });

    res.status(201).json(newJournal);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el diario" });
  }
};

// Actualizar un diario
export const updateDailyJournal = async (req, res) => {
  try {
    const journal = await DailyJournal.findByPk(req.params.id);

    if (!journal) {
      return res.status(404).json({ error: "Diario no encontrado" });
    }

    const { user_id, date, entry, rating } = req.body;

    journal.user_id = user_id ?? journal.user_id;
    journal.date = date ?? journal.date;
    journal.entry = entry ?? journal.entry;
    journal.rating = rating ?? journal.rating;

    await journal.save();

    res.json(journal);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el diario" });
  }
};

// Eliminar un diario
export const deleteDailyJournal = async (req, res) => {
  try {
    const journal = await DailyJournal.findByPk(req.params.id);

    if (!journal) {
      return res.status(404).json({ error: "Diario no encontrado" });
    }

    await journal.destroy();
    res.json({ message: "Diario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el diario" });
  }
};
