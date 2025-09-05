const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Url = require("./models/Url");
const Note = require("./models/Note");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Url.deleteMany({});
    await Note.deleteMany({});

    // Insert sample URLs
    const urls = [
      { url: "https://example.com/1", short_url: "ex1" },
      { url: "https://example.com/2", short_url: "ex2" },
      { url: "https://example.com/3", short_url: "ex3" },
      { url: "https://example.com/4", short_url: "ex4" },
      { url: "https://example.com/5", short_url: "ex5" },
    ];

    // Insert sample Notes
    const notes = [
      { title: "First Note", note: "This is note 1", author: "Alice" },
      { title: "Second Note", note: "This is note 2", author: "Bob" },
      { title: "Third Note", note: "This is note 3", author: "Charlie" },
      { title: "Fourth Note", note: "This is note 4", author: "Diana" },
      { title: "Fifth Note", note: "This is note 5", author: "Eve" },
    ];

    await Url.insertMany(urls);
    await Note.insertMany(notes);

    console.log("✅ Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
};

seedData();
