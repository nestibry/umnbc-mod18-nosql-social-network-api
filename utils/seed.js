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

    // Seed the users collection
    await User.create(usersData);
    const users = await User.find().sort({username:1});

    for (var i = 0; i < users.length; i++) {
        console.log({
           id: users[i]._id,
            username: users[i].username
        });
    }

    // const newUsers = await connection.db.collection('users').find();


    // console.table(newUsers);



    console.info('Seeding complete! 🌱');
    process.exit(0);
});