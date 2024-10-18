import mongoose from "mongoose";

const userModelSchema = new mongoose.Schema({
    display_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    profile: {
        type: String
    },
    password_hash: {
        type: String,
        required: true,
    },
    receive_newsletter: {
        type: Boolean,
        enum: [true, false],
        default: true,
    },
    application_theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "dark",
    },
    currency: {
        type: String,
        default: "INR",
    },
    hourly_rate: {
        type: Number
    },
    timezone: {
        type: String,
        default: "IST",
    },
    description: {
        type: String,
    },
    role: {
        type: String,
        enum: ["Freelance", "Admin", "client"],
        default: "Freelance",
    },
}, {
    timestamps: true
})

const User = mongoose.model("User", userModelSchema);

export default User;
