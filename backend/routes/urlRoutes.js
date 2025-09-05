const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

// GET /api/urls - return all URLs
router.get("/", async (req, res) => {
    try {
        const urls = await Url.find().sort({ created_at: -1 });
        res.json(urls);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch URLs" });
    }
});

router.get("/:short_url", async (req, res) => {
    try {
        const { short_url } = req.params;

        // @TODO: fetch from DB and validate if date is greater than 7 days

        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }

        const url = { "_id": "68bb01671e5774010c655d7d", "url": "https://example.com/4", "short_url": "ex4", "created_at": "2025-09-05T15:27:35.100Z", "__v": 0 }

        res.json(url);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch URL" });
    }
});


// POST /api/urls - create new URL
router.post("/", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "url is required" });
        }

        short_url = 'ex4' // @TODO: generate unique short_url and save to DB
        const newUrl = new Url({ url, short_url });
        res.status(201).json(newUrl);
    } catch (err) {
        res.status(500).json({ error: "Failed to create URL" });
    }
});

module.exports = router;
