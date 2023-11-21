const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Schema.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            require: true,
            minLength: 1,
            maxLength: 280
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        }, 
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
          },
        id: false,
    }

);

module.exports = reactionSchema;