import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        const DB = await mongoose.connect(process.env.MONGODB_CLUSTER);
        console.log("MongoDB connected on host:", DB.connection.host);
    } catch (e) {
        console.log("Error connecting to MongoDB: " + e.message);
        process.exit(1); // Exit process if connection fails
    }
};

// Function to get the MongoDB client instance
export const getMongoClientId = () => {
    // Ensure the connection exists and is active
    if (mongoose.connection && mongoose.connection.client) {
        return mongoose.connection.getClient();
    } else {
        console.log("MongoDB connection not established yet.");
        return null;
    }
};
