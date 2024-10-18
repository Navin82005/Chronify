import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import cookieSession from "cookie-session";

// import MongoStore from "connect-mongo";

import { connectDB, getMongoClientId } from "./util/db.util.js";
import userRoutes from "./routes/user.route.js";
import authRouters from "./routes/auth.route.js";


// INITIALIZE ----------------------------
dotenv.configDotenv()

const server = express();
server.use(express.json());

// CONNECT TO MONGODB SERVER -------------
connectDB();

// CREATING COOKIE -----------------------
server.use(
    cookieSession({
        name: "session",
        keys: ["cyberwlve"],
        maxAge: 24 * 60 * 60 * 100,
    })
);

server.use(passport.initialize());
server.use(passport.session());

// CONFIGURING CORS OPTIONS
server.use(
    cors({
        origin: 'https://localhost:300',
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

// ROUTES --------------------------------
server.use("/api/user", userRoutes);

// GOOGLE OAUTH2 -------------------------
server.use("/auth", authRouters);

const PORT = process.env.SERVER_PORT || 5000
console.log("Starting server on port at " + PORT);

server.listen(PORT, () => {
    console.log("Server listening on port: http://localhost:" + PORT)
})
