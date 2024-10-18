import mongoose from "mongoose";

export const OAuthUserSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        authId: {
            type: String,
            unique: true,
            required: true
        },
        authType: {
            type: String,
            enum: ["google", "facebook", "discord"],
        }
    }, {
    timestamps: true,
})

const OAuthUser = mongoose.model("OAuthUser", OAuthUserSchema);

export default OAuthUser;
