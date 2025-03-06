const { MongoClient ,ObjectId} = require("mongodb");
const { updateTelescope } = require("./TelescopeDB");

// Replace with your MongoDB Atlas Connection String
const uri = "mongodb+srv://aminashahzadkhan:amina2004@cluster0.evdyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoDB Client
const client = new MongoClient(uri);

// Database and Collection Names
const dbName = "virtual_telescope";
const collectionName = "Eyepieces";

// Connect to MongoDB Atlas
async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB Atlas");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Ensure the index is created only once
       collection.createIndex({ focal_length: 1 ,AFOV : 1}, { unique: true });

        return collection;
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
}

connectDB();

// inserts record

async function insertEyepiece(EP) {
    try {
        const collection = await connectDB();
        const result = await collection.insertOne(EP);
        console.log(`✅ Eyepiece inserted with ID: ${result.insertedId}`);
    } catch (error) {
        if (error.code === 11000) {
            console.error("❌ Error: Eyepiece name must be unique!");
        } else {
            console.error("❌ Insert Error:", error);
        }
    }
}



// prints all records on console
async function getEyepieces() {
    const collection = await connectDB();
    const tels = await collection.find({}).toArray();
    console.log("📌 Eyepieces:", tels);
}





// delete rec from db 
async function deleteEyepiece(focal_length,AFOV) {
    try {
        const collection = await connectDB();
        const result = await collection.deleteOne({ focal_length : Number(focal_length) , AFOV : Number( AFOV) });

        if (result.deletedCount === 0) {
            console.log(`⚠️ No Eyepieces found with these configurations: Focal length = ${focal_length } and Apparent field of view: ${AFOV}`);
        } else {
            console.log(`❌ Deleted ${result.deletedCount} document(s)`);
        }
    } catch (error) {
        console.error("❌ Delete Error:", error);
    }
}


// exporting functions so that i can use it in diff files 

module.exports = {
    insertEyepiece,
    getEyepieces,
    deleteEyepiece,
    ObjectId,  // Export ObjectId in case you need it in another file
};
