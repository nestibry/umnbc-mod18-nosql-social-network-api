const mongoose = require("mongoose");
const reactionSchema = require("./Reaction");

/*
 Notes:
    Using 'user' instead of username to pass in the user's _id, and from there use joins to get the username
    Using timestamps: true to get the createdAt value
*/

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
        reactions: [reactionSchema],
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
            virtuals: true
          },
          id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions?.length;
});

// thoughtSchema.virtual('created_on').get(function() {
//     return this.createdAt;
// });

const Thought = mongoose.model("Thought", thoughtSchema);
module.exports = Thought;