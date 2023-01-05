const express = require("express");
const router = express.Router();

const {
  getNotes,
  getNoteById,
  addNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");

const requireAuth = require("../middlewares/requireAuth");

router.use(requireAuth);

// get all notes
router.get("/", getNotes);

// get note by id
router.get("/:id", getNoteById);

// add a new note to db
router.post("/", addNote);

// delete existing note
router.delete("/:id", deleteNote);

// update existing note
router.put("/:id", updateNote);

module.exports = router;
