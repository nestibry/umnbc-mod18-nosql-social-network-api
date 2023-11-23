const connection = require('../config/connection');
const { User, Thought } = require('../models');
const usersData = require("./user.data.json");
const thoughtsData = require("./tought.data.json");

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected to DB. Seeding the Database...');

    // Delete the collections if they exist
    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
        await connection.dropCollection('users');
    }

    
    // Seed the Users Collection and get back users data to assist we other seeding
    const createdUsers = await User.create(usersData);
    const users = createdUsers.map( user => {return {  _id: user._id, username: user.username }});
    console.log("Users: ")
    console.table(users);

    
    // Seed the Thoughts Collection, Tranform data to include the new ObjectId for each user
    const thoughtsWithUserId = [];
    users.forEach(user => {
        const thoughtsByUsername = thoughtsData.filter( thought => thought.username === user.username );
        if(thoughtsByUsername.length){
            thoughtsByUsername.forEach(thought => {
                thought.user = user._id;
                delete thought.username;
                thoughtsWithUserId.push(thought);
            });
        }
    })
    const createdThoughts = await Thought.create(thoughtsWithUserId);
    const thoughts = createdThoughts.map( thought => {return {  _id: thought._id, thoughtText: thought.thoughtText, user: thought.user }});
    console.log("Thoughts: ")
    console.table(thoughts);
    
    
    const friendUsername = "Gordon";

    const friendId = users.filter( user => user.username === friendUsername);

    console.log(`friend: ${friendUsername} => ${friendId}`);
    
    
    

    

    console.info('Seeding complete! 🌱');
    process.exit(0);
});