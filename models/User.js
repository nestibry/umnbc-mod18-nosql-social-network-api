const  mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Must match a valid email address, see Mongoose's matching validation
            // https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
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

