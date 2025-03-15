const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

// ✅ MongoDB Connection String
const MONGO_URI = "mongodb+srv://aminashahzadkhan:amina2004@cluster0.evdyr.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
// ✅ Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Schema for Telescopes Collection
const telescopeSchema = new mongoose.Schema({
  name: String,
  type: String,
  aperture: String,
  focal_length: String,
  mount: String,
});
const Telescope = mongoose.model("telescopes", telescopeSchema, "telescopes");

// ✅ Define Schema for Eyepieces Collection
const eyepieceSchema = new mongoose.Schema({
  model: String,
  eyepiece_focal_length: String,
  AFOV: String, // Apparent Field of View
});
const Eyepiece = mongoose.model("eyepieces", eyepieceSchema, "eyepieces");

// ✅ Define Schema for Cameras Collection
const cameraSchema = new mongoose.Schema({
  camera_name: String,
  pixel_size: String,
  resolution: {
    width: String,
    height: String,
  },
  sensor_size: {
    width: String,
    height: String,
  },
});
const Camera = mongoose.model("cameras", cameraSchema, "cameras");

// ✅ URLs for different equipment
const telescopeURL = "https://www.x2r.uk/equipmentdb.php?type=telescope";
const eyepieceURL = "https://www.x2r.uk/equipmentdb.php?type=eyepiece";
const cameraURL = "https://www.x2r.uk/equipmentdb.php?type=camera";

// ✅ Function to Extract and Store Data
async function scrapeData(url, type) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let items = [];

    $("table tr").each((index, element) => {
      if (index === 0) return; // Skip table header

      const cols = $(element).find("td");
      if (cols.length < 3) return; // Ensure all necessary columns exist

      let item;
      if (type === "telescope") {
        item = {
          name: $(cols[0]).text().trim(),
          type: $(cols[1]).text().trim(),
          aperture: $(cols[2]).text().trim(),
          focal_length: $(cols[3]).text().trim(),
          mount: $(cols[4]).text().trim(),
        };
      } else if (type === "eyepiece") {
        item = {
          model: $(cols[0]).text().trim(), // ✅ Corrected: This should be the eyepiece model
          eyepiece_focal_length: $(cols[1]).text().trim(), // ✅ Corrected: Focal Length
          AFOV: $(cols[2]).text().trim(), // ✅ Corrected: Apparent Field of View
        };
      } else if (type === "camera") {
        item = {
          camera_name: $(cols[0]).text().trim(), // ✅ Corrected: Camera Name
          pixel_size: $(cols[1]).text().trim(), // ✅ Corrected: Pixel Size
          resolution: {
            width: $(cols[2]).text().trim(), // ✅ Corrected: Resolution Width
            height: $(cols[3]).text().trim(), // ✅ Corrected: Resolution Height
          },
          sensor_size: {
            width: $(cols[4]).text().trim(), // ✅ Corrected: Sensor Width
            height: $(cols[5]).text().trim(), // ✅ Corrected: Sensor Height
          },
        };
      }

      if (item) {
        items.push(item);
      }
    });

    console.log(`🔍 Scraped ${items.length} ${type}(s):`, items); // ✅ Log the data before inserting

    if (items.length > 0) {
      if (type === "telescope") {
        await Telescope.insertMany(items);
        console.log(`✅ Inserted ${items.length} telescopes`);
      } else if (type === "eyepiece") {
        await Eyepiece.insertMany(items);
        console.log(`✅ Inserted ${items.length} eyepieces`);
      } else if (type === "camera") {
        await Camera.insertMany(items);
        console.log(`✅ Inserted ${items.length} cameras`);
      }
    } else {
      console.log(`⚠️ No data found for ${type}`);
    }
  } catch (error) {
    console.error(`❌ Error scraping ${type} data:`, error);
  }
}

// ✅ Run Scraping
async function main() {
  await scrapeData(telescopeURL, "telescope");
  await scrapeData(eyepieceURL, "eyepiece");
  await scrapeData(cameraURL, "camera");

  mongoose.connection.close();
}

main();
