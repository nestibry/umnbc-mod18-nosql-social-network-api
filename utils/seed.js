const connection = require('../config/connection');
const { User, Thought } = require('../models');
const usersData = require("./user.data.json");
const thoughtsData = require("./tought.data.json");
const friendsData = require("./user.friends.data.json");


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected to DB. Seeding the Database...');


    ///////////////////////////////////////////////////////////////////////////////////////
    // Delete the collections if they exist
    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
        await connection.dropCollection('users');
    }


    /////////////////////////////////////////////////////////////////////////////////////// 
    // Seed the Users Collection and get back users data to assist we other seeding
    const createdUsers = await User.create(usersData);
    const users = createdUsers.map(user => { return { _id: user._id, username: user.username } });
    console.log("Users: ")
    console.table(users);


    ///////////////////////////////////////////////////////////////////////////////////////
    // Updating each user's friends in the Users collection => First need mutate the friendsData into all userId's (_id)
    function getUserIdByUsername(username) {
        const user = users.find(user => user.username === username);
        return user ? user._id : null;
    }

    // Only use friendsData that has userIds
    const friendsDataByIds = friendsData
        .map(item => ({ userId: getUserIdByUsername(item.username), friendId: getUserIdByUsername(item.friendsUsername) }))
        .filter(item => (item.userId && item.friendId));
    console.log("Friends: ");
    console.table(friendsDataByIds);
    
    // Updating each user's friends in the User Collection
    async function updateUserFriends(friendsDataByIds) {
        try {
            const updatePromises = friendsDataByIds.map(async (item) => {
                const userId = item.userId;
                const friendIdToAdd = item.friendId;

                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { $push: { friends: friendIdToAdd } },
                    { new: true }
                );
                // console.log('User updated successfully:', updatedUser);
            });

            await Promise.all(updatePromises);
        } catch (err) {
            console.error('Error updating users:', err);
        }
    }
    await updateUserFriends(friendsDataByIds);


    ///////////////////////////////////////////////////////////////////////////////////////
    // Seed the Thoughts Collection, Tranform data to include the new ObjectId for each user
    const thoughtsWithUserId = [];
    users.forEach(user => {
        const thoughtsByUsername = thoughtsData.filter(thought => thought.username === user.username);
        if (thoughtsByUsername.length) {
            thoughtsByUsername.forEach(thought => {
                thought.user = user._id;
                delete thought.username;
                thoughtsWithUserId.push(thought);
            });
        }
    });
    const createdThoughts = await Thought.create(thoughtsWithUserId);
    const thoughts = createdThoughts.map(thought => { return { _id: thought._id, thoughtText: thought.thoughtText, user: thought.user } });
    console.log("Thoughts: ")
    console.table(thoughts);


    ///////////////////////////////////////////////////////////////////////////////////////
    // Updating each user's thoughts in the User Collection
    async function updateUserThoughts(thoughts) {
        try {
            const updatePromises = thoughts.map(async (thought) => {
                const userId = thought.user;
                const thoughtIdToAdd = thought._id;

                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { $push: { thoughts: thoughtIdToAdd } },
                    { new: true }
                );
                // console.log('User updated successfully:', updatedUser);
            });

            await Promise.all(updatePromises);
        } catch (err) {
            console.error('Error updating users:', err);
        }
    }
    await updateUserThoughts(thoughts);


    ///////////////////////////////////////////////////////////////////////////////////////
    // Adding a 'welcome' reaction to each thought from Lucius Fox (the moderator of the Socal Network)
    const luciusUserId = users.filter(user => user.username === "Lucius Fox" ).map(item => {return item._id});
    const weclomeMessage = "Welcome to the Social Network!";

    // Updating each user's friends in the User Collection
    async function updateThoughtReactions(thoughts) {
        try {
            const updatePromises = thoughts.map(async (thought) => {
                const thoughtId = thought._id;
                
                const updatedThought = await Thought.findByIdAndUpdate(
                    thoughtId,
                    { $push: { reactions: {reactionBody: weclomeMessage, user: luciusUserId }} },
                    { new: true }
                );
                console.log('Thought updated successfully:', updatedThought);
            });

            await Promise.all(updatePromises);
        } catch (err) {
            console.error('Error updating thoughts:', err);
        }
    }
    await updateThoughtReactions(thoughts);


    ///////////////////////////////////////////////////////////////////////////////////////
    console.info('Seeding complete! 🌱');
    process.exit(0);
});