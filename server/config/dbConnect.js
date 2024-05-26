const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Loading environment variables from .env file
dotenv.config();

const mongo_uri = process.env.MONGO_URI;


const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

//  Connect to the database
const connectMongoDB = async () => {
  try {
    console.log(process.env.MONGO_URI)
    const connect = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectMongoDB