const { MongoClient ,ObjectId} = require("mongodb");

// Replace with your MongoDB Atlas Connection String
const uri = "mongodb+srv://aminashahzadkhan:amina2004@cluster0.evdyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoDB Client
const client = new MongoClient(uri);

// Database and Collection Names
const dbName = "virtual_telescope";
const collectionName = "telescopes";

// Connect to MongoDB Atlas
async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB Atlas");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Ensure the index is created only once
       collection.createIndex({ tel_name: 1 }, { unique: true });

        return collection;
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
}

connectDB();

// inserts record

async function insertTelescope(tel) {
    try {
        const collection = await connectDB();
        const result = await collection.insertOne(tel);
        console.log(`✅ Telescope inserted with ID: ${result.insertedId}`);
    } catch (error) {
        if (error.code === 11000) {
            console.error("❌ Error: Telescope name must be unique!");
        } else {
            console.error("❌ Insert Error:", error);
        }
    }
}



// prints all records on console
async function getTelescopes() {
    const collection = await connectDB();
    const tels = await collection.find({}).toArray();
    console.log("📌 Telescopes:", tels);
}




// updates user info 
async function updateTelescope(tel_name, newData) {
    try {
        const collection = await connectDB();
        const result = await collection.updateOne(
            { tel_name: tel_name }, // Find by tel_name
            { $set: newData } // Update fields
        );

        if (result.matchedCount === 0) {
            console.log(`⚠️ No telescope found with name: ${tel_name}`);
        } else {
            console.log(`✅ Modified ${result.modifiedCount} document(s)`);
        }
    } catch (error) {
        console.error("❌ Update Error:", error);
    }
}




// delete rec from db 
async function deleteTelescope(tel_name) {
    try {
        const collection = await connectDB();
        const result = await collection.deleteOne({ tel_name: tel_name });

        if (result.deletedCount === 0) {
            console.log(`⚠️ No telescope found with name: ${tel_name}`);
        } else {
            console.log(`❌ Deleted ${result.deletedCount} document(s)`);
        }
    } catch (error) {
        console.error("❌ Delete Error:", error);
    }
}


// exporting functions so that i can use it in diff files 

module.exports = {
    insertTelescope,
    getTelescopes,
    updateTelescope,
    deleteTelescope,
    ObjectId,  // Export ObjectId in case you need it in another file
};
