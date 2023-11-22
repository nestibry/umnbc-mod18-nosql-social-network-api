const connection = require('../config/connection');
const { User, Thought } = require('../models');
const usersData = require("./user.data.json");

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
            username: "Sal",
            email: "sal@sal.com"
        },
        {
            username: "Amiko",
            email: "amiko@amiko.com"
        }
    ];

    // await User.collection.insertMany(arrUsers);

    // await User.collection.insertOne({
    //     username: "Mara",
    //     email: "mara@mara.com"
    // });

    await User.create({
        username: "Wilder",
        email: "wilder@wilder.com"
    });

    await User.create(arrUsers);

    await User.create(usersData);

    
    console.info('Seeding complete! 🌱');
    process.exit(0);
});