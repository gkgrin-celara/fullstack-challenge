const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    note: { type: String, required: true },
    author: { type: String, required: true },
    created_at: { type: Date, required: false }
});

module.exports = mongoose.model("Note", noteSchema);
