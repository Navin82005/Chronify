import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import MongoStore from "connect-mongo";

import { connectDB, getMongoClientId } from "./util/db.util.js";
import userRoutes from "./routes/user.route.js";
import authRouters from "./routes/auth.route.js";
import authorizationMiddleware from "./middleware/authorization.middleware.js";


// INITIALIZE ----------------------------
dotenv.configDotenv()

const server = express();
server.use(express.json());

// CONNECT TO MONGODB SERVER -------------
connectDB();

// CONFIGURING CORS OPTIONS
server.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

// MIDDLEWARE
server.use(authorizationMiddleware);

// ROUTES --------------------------------
server.use("/api/user", userRoutes);

// GOOGLE OAUTH2 -------------------------
server.use("/auth", authRouters);

const PORT = process.env.SERVER_PORT || 5000
console.log("Starting server on port at " + PORT);

server.listen(PORT, () => {
    console.log("Server listening on port: http://localhost:" + PORT)
})
