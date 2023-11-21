const mongoose = require("mongoose");

/*
 Thought:
    Using timestamps: true to get the createdAt value
    Need to come back and use a getter method to format the timestamp on query
    createdAt: 'Jun 10th, 2020 at 07:30'
    Using 'user' instead of username to pass in the user's _id, and from there use joins to get the username
    Still need to link up to a reactionSchema
*/


// reactions (These are like replies)

// Array of nested documents created with the reactionSchema
// Schema Settings:

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.


const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
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
        timestamps: true
    }
);

const Thought = mongoose.model("Thought", thoughtSchema);
module.exports = Thought;