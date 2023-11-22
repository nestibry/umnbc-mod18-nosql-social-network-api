const connection = require('../config/connection');
const { User, Thought } = require('../models');
const usersData = require("./user.data.json");
const thoughtsData = require("./tought.data.json");

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

    // Seed the users collection and get back users data to assist we other seeding
    await User.create(usersData);
    const sortedUsers = await User.find().sort({username:1});
    console.log(sortedUsers.length);
    console.log(sortedUsers[0].username);
    // for (var i = 0; i < sortedUsers.length; i++) {
    //     console.log({
    //        id: sortedUsers[i]._id,
    //         username: sortedUsers[i].username
    //     });
    // }

    // Seed the thoughts collection, mutate data first
    for(var i = 0; i < sortedUsers.length; i++){
        const filteredThoughts = thoughtsData.filter( item => item.username === sortedUsers[i].username);
        console.log(filteredThoughts.length);
        if(filteredThoughts.length){
            filteredThoughts.forEach(obj => {
                obj.user = sortedUsers[i].username;
                delete obj.username;
            });
            console.log(filteredThoughts);
        }
    }


    




    console.info('Seeding complete! 🌱');
    process.exit(0);
});