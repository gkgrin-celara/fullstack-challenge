const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    url: { type: String, required: true },
    short_url: { type: String, required: true },
    created_at: { type: Date, required: false }
});

module.exports = mongoose.model("Url", urlSchema);
