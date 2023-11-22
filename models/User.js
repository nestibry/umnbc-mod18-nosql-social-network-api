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
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please use a valid email address."]
            // Must match a valid email address, see Mongoose's matching validation (I'm using the Regex from Module 17 Challenge)
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
        timestamps: true,
        toJSON: {
            virtuals: true,
          },
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

userSchema.virtual('created_on').get(function() {
    return `${this.createdAt.getMonth()+1}/${this.createdAt.getDate()}/${this.createdAt.getFullYear()} at ${this.createdAt.toLocaleTimeString()}`;
});

const User = mongoose.model("User", userSchema);
module.exports = User;

