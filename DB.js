const mongoose = require("mongoose");

const DB_URI = process.env.DATABASE_URL;

const connect_Mongo = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

module.exports = connect_Mongo;
