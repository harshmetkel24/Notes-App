const mongoose = require("mongoose");
const Note = require("../models/noteModel");

const getNotes = async (req, res) => {
  const user_id = req.user._id;
  const notes = await Note.find({ user_id }).sort({ updatedAt: -1 });

  res.status(200).json(notes);
};

const getNoteById = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "No such note exist" });
  }

  const note = await Note.findOne({ _id: id, user_id });

  if (!note) {
    return res.status(400).json({ error: "No such note exist" });
  }

  res.status(200).json(note);
};

const addNote = async (req, res) => {
  const { title, desc } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!desc) {
    emptyFields.push("desc");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "All Fields must be filed", emptyFields });
  }

  // add document to db
  try {
    const user_id = req.user._id;

    const note = await Note.create({ title, desc, user_id });

    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such note exist" });
  }

  const note = await Note.findOneAndDelete({ _id: id, user_id });

  if (!note) {
    return res.status(400).json({ error: "No such note exist" });
  }

  res.status(200).json(note);
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ error: "No such note exist" });
  }

  const note = await Note.findOneAndUpdate(
    { _id: id, user_id },
    { ...req.body }
  );

  if (!note) {
    return res.status(200).json({ error: "No such note exist" });
  }

  res.status(200).json(note);
};

module.exports = {
  getNotes,
  getNoteById,
  addNote,
  deleteNote,
  updateNote,
};
