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
        return db.collection(collectionName);
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
}

connectDB();

// inserts record

async function insertUser(user) {
    const collection = await connectDB();
    const result = await collection.insertOne(user);
    console.log(`✅ User inserted with ID: ${result.insertedId}`);
}



// prints all records on console
async function getUsers() {
    const collection = await connectDB();
    const users = await collection.find({}).toArray();
    console.log("📌 Users:", users);
}




// updates user info 
async function updateUser(id, newData) {
    const collection = await connectDB();
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: newData });
    console.log(`✅ Modified ${result.modifiedCount} document(s)`);
}



// delete rec from db 
async function deleteUser(id) {
    const collection = await connectDB();
    const result = await collection.deleteOne({ _id: ObjectId(id)});
    console.log(`❌ Deleted ${result.deletedCount} document(s)`);
}

// exporting functions so that i can use it in diff files 

module.exports = {
    insertUser,
    getUsers,
    updateUser,
    deleteUser,
    ObjectId,  // Export ObjectId in case you need it in another file
};