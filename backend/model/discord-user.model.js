import mongoose from "mongoose"

const DiscordAccountModel = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        discordId: {
            type: String,
            required: true,
            unique: true,
        }
    }, {
    timestamps: true
}
)

const DiscordUser = mongoose.model("DiscordUser", DiscordAccountModel)
export default DiscordUser;