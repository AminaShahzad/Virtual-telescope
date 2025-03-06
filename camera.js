const { MongoClient, ObjectId } = require("mongodb");

// MongoDB Connection URI
const uri = "your_mongo_connection_string";
const client = new MongoClient(uri);

async function insertCameraData() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");

        const db = client.db("your_database_name");
        const collection = db.collection("your_collection_name");

        // Construct the document with proper types
        const cameraData = {
            _id: new ObjectId("67c6a7a2607df5e1a9ed8817"),
            pixel_size: parseFloat("3.76"),  // Convert to float
            resolution: { width: 9576, height: 6388 },  // Store as integers
            sensor_size: { width: 36, height: 24, unit: "mm" }, // Store as object with unit
            camera_name: "ZWO ASI6200MM Pro Full Frame"
        };

        // Insert the document
        const result = await collection.insertOne(cameraData);
        console.log("✅ Document inserted:", result.insertedId);
    } catch (error) {
        console.error("❌ Error inserting document:", error);
    } finally {
        await client.close();
    }
}

// Call the function to insert data
insertCameraData();
