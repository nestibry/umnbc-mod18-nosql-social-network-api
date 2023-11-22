const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Delete the collections if they exist
    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
        await connection.dropCollection('users');
    }

    // Create Users
    const newUser = new User({
        username: "BryGuy",
        email: "nestinbk29@gmail.com",
    });

    await newUser.save();

    const arrUsers = [
        {
            username: "Bryan",
            email: "bryan@bryan.com"
        },
        {
            name: "Sal",
            email: "sal@sal.com"
        },
        {
            name: "Amiko",
            email: "amiko@amiko.com"
        }
    ];

    await User.collection.insertMany(arrUsers);



    process.exit(0);
});