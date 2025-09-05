const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
    let dbStatus = "disconnected";

    // Check current MongoDB connection state
    const states = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting"
    };

    try {
        dbStatus = states[mongoose.connection.readyState] || "unknown";
    } catch (err) {
        dbStatus = "error";
    }

    res.json({
        status: "ok",
        backend: "running",
        database: dbStatus
    });
});

module.exports = router;