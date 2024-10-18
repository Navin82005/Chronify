import mongoose from "mongoose"

const GoogleAccountModel = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        googleId: {
            type: String,
            required: true,
            unique: true,
        }
    }, {
    timestamps: true
}
)

const GoogleUser = mongoose.model("GoogleUser", GoogleAccountModel)
export default GoogleUser;