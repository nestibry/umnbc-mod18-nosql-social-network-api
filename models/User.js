const  mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            // Unique
            // Trimmed
        },
        email: {
            type: String,
            required: true,
            // Unique
            // Must match a valid email address, see Mongoose's matching validation
        },
        thoughts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thought"
        }],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

