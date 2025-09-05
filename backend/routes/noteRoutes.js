const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET /api/notes - return all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ created_at: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// POST /api/notes - create new note
router.post("/", async (req, res) => {
  try {
    const { title, note, author } = req.body;
    if (!title || !note || !author) {
      return res.status(400).json({ error: "title, note, and author are required" });
    }

    const newNote = new Note({ title, note, author });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

module.exports = router;
