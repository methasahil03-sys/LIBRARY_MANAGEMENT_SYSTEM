require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { UserModel } = require("./model/UserModel");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const adminEmail = process.env.ADMIN_EMAIL.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD.trim();

    if (!adminEmail || !adminPassword) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    }