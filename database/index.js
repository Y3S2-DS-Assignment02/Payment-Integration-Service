
// const { MongoClient } = require('mongodb');
// require('dotenv').config();

// exports.connectToDatabase = async () => {
//     try {
//         const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
//         const dbName = 'DS_Assignment01';
//         const client = new MongoClient(url);
//         await client.connect();
//         const db = client.db(dbName);
//         console.log('Connected to the database');
//         return db;
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//         throw error;
//     }
// };
const mongoose = require("mongoose");
require("dotenv").config();

exports.connectToDatabase = async () => {
  try {
    const url = process.env.MONGODB_URI || "mongodb://localhost:27017";

    await mongoose.connect(url, {});

    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};