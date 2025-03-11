const express = require("express");
const cors = require("cors");
const { connectDB } = require("./models/Users"); // Ensure correct import
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Ensure this matches your frontend API calls
app.use("/api/users", userRoutes);

const PORT = 5000;

// Start server & connect to MongoDB
app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);

    try {
        await connectDB();
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
});

const { deleteUser } = require("./models/Users.js");

// Delete a specific user
deleteUser("aneebazafar4201@gmail.com");