const { MongoClient ,ObjectId} = require("mongodb");

// Replace with your MongoDB Atlas Connection String
const uri = "mongodb+srv://aminashahzadkhan:amina2004@cluster0.evdyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoDB Client
const client = new MongoClient(uri);

// Database and Collection Names
const dbName = "virtual_telescope";
const collectionName = "Users";

// Connect to MongoDB Atlas
async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB Atlas");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Ensure the index is created only once
       collection.createIndex({ email: 1, password:1}, { unique: true });

        return collection;
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
}

connectDB();

// inserts record

async function insertUser(user) {
    try {
        const collection = await connectDB();
        const result = await collection.insertOne(user);
        console.log(`✅ User inserted with ID: ${result.insertedId}`);
    } catch (error) {
        if (error.code === 11000) {
            console.error("❌ Error: User exists already!");
        } else {
            console.error("❌ Insert Error:", error);
        }
    }
}



// prints all records on console
async function getUsers() {
    const collection = await connectDB();
    const users = await collection.find({}).toArray();
    console.log("📌 Users:", users);
}




// updates user info 
async function updateUsers(email, password, newData) {
    try {
        const collection = await connectDB();
        const result = await collection.updateOne(
            { email: email, password: password },  // 🔥 Correct filter
            { $set: newData }                      // 🔥 Correct update object
        );

        if (result.matchedCount === 0) {
            console.log(`⚠️ Invalid email or password. No document updated.`);
        } else {
            console.log(`✅ Modified ${result.modifiedCount} document(s)`);
        }
    } catch (error) {
        console.error("❌ Update Error:", error);
    }
}





// delete rec from db 
async function deleteUser(email,password) {
    try {
        const collection = await connectDB();
        const result = await collection.deleteOne({ email: email , password: password });

        if (result.deletedCount === 0) {
            console.log(`⚠️ No user found .`);
        } else {
            console.log(`❌ Deleted ${result.deletedCount} document(s)`);
        }
    } catch (error) {
        console.error("❌ Delete Error:", error);
    }
}


// exporting functions so that i can use it in diff files 

module.exports = {
    insertUser,
    getUsers,
    updateUsers,
    deleteUser,
    ObjectId,  // Export ObjectId in case you need it in another file
};
