const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
    {
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
        createdAt: {
            type: Date,
            // default: Date.now,
            get: date => `${new Date(date).getFullYear()}/${new Date(date).getMonth() + 1}/${new Date(date).getDate()} at ${date.toLocaleTimeString()}`
        },
        updatedAt: {
            type: Date,
            get: date => `${new Date(date).getFullYear()}/${new Date(date).getMonth() + 1}/${new Date(date).getDate()} at ${date.toLocaleTimeString()}`
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