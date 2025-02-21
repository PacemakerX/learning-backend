const mongoose = require("mongoose");

const url =
  "mongodb+srv://sparsh:first@cluster0.twrbx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectToDatabase = async () => {
  try {
    await mongoose.connect(url, connectionParams);
    console.log("Connected to the database");
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

module.exports = connectToDatabase;