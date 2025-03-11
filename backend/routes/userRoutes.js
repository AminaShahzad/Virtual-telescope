const express = require("express");
const { insertUser, getUsers, updateUsers, deleteUser } = require("../models/Users.js"); // ✅ Correct import
const bcrypt = require("bcrypt"); // Ensure password hashing check
const { connectDB } = require("../models/Users"); // Import connectDB function


const router = express.Router();

// ✅ User Registration Route
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const db = await connectDB();
        const collection = db.collection("Users");

        await collection.insertOne({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;

// ✅ User Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const db = await connectDB();
        const collection = db.collection("Users");

        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error("❌ Error logging in:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

// ✅ Route for adding a user
router.post("/add", async (req, res) => {
    try {
        await insertUser(req.body);
        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Route for getting all users
router.get("/", async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Route for updating user
router.put("/update", async (req, res) => {
    try {
        const { email, password, newData } = req.body;
        await updateUsers(email, password, newData);
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Route for deleting user
router.delete("/delete", async (req, res) => {
    try {
        const { email, password } = req.body;
        await deleteUser(email, password);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
