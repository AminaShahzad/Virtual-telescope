const { MongoClient, ObjectId } = require("mongodb");

// MongoDB Connection URI (Replace with your actual credentials)
const uri = "mongodb+srv://aminashahzadkhan:amina2004@cluster0.evdyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB Client
const client = new MongoClient(uri);

// Database and Collection Names
const dbName = "virtual_telescope";
const collectionName = "camera";

// Connect to MongoDB
async function connectDB() {
    try {
        console.log("🔄 Connecting to MongoDB...");
        await client.connect();
        console.log("✅ Connected to MongoDB Atlas");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Ensure unique index for camera_name
        await collection.createIndex({ camera_name: 1 }, { unique: true });
        console.log("✅ Unique index on camera_name ensured.");

        return collection;
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
}

// 📌 Insert a new camera
async function insertCamera(camera) {
    try {
        const collection = await connectDB();
        console.log("📌 Trying to insert camera:", camera);
        const result = await collection.insertOne(camera);
        console.log(`✅ Camera inserted with ID: ${result.insertedId}`);
    } catch (error) {
        if (error.code === 11000) {
            console.error("❌ Error: Camera name must be unique!");
        } else {
            console.error("❌ Insert Error:", error);
        }
    }
}

// 📌 Fetch all cameras
async function getCameras() {
    try {
        const collection = await connectDB();
        const cameras = await collection.find({}).toArray();
        console.log("📷 Cameras List:", cameras);
    } catch (error) {
        console.error("❌ Fetch Error:", error);
    }
}

// 📌 Update camera details
async function updateCamera(camera_name, newData) {
    try {
        const collection = await connectDB();
        const result = await collection.updateOne(
            { camera_name: camera_name }, // Find by camera_name
            { $set: newData } // Update fields
        );

        if (result.matchedCount === 0) {
            console.log(`⚠️ No camera found with name: ${camera_name}`);
        } else {
            console.log(`✅ Modified ${result.modifiedCount} document(s)`);
        }
    } catch (error) {
        console.error("❌ Update Error:", error);
    }
}

// 📌 Delete a camera
async function deleteCamera(camera_name) {
    try {
        const collection = await connectDB();
        const result = await collection.deleteOne({ camera_name: camera_name });

        if (result.deletedCount === 0) {
            console.log(`⚠️ No camera found with name: ${camera_name}`);
        } else {
            console.log(`🗑️ Deleted ${result.deletedCount} document(s)`);
        }
    } catch (error) {
        console.error("❌ Delete Error:", error);
    }
}

// 🚀 Example Usage
// Uncomment the function you want to run:

//  insertCamera({
//      pixel_size: 3.76,  
//      resolution: { width: 9576, height: 6388 },  
//      sensor_size: { width: 36, height: 24 }, 
//      camera_name: "ZWO ASI6200MM Pro Full Frame"
//  });

 //getCameras();

//  updateCamera("ZWO ASI6200MM Pro Full Frame", { pixel_size: 4.2 });

 //deleteCamera("ZWO ASI6200MM Pro Full Frame");

// Export functions for use in other files
module.exports = {
    insertCamera,
    getCameras,
    updateCamera,
    deleteCamera,
    ObjectId,
};
