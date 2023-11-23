const connection = require('../config/connection');
const { User, Thought } = require('../models');
const usersData = require("./user.data.json");
const thoughtsData = require("./tought.data.json");
const friendsData = require("./user.friends.data.json");

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
    const users = createdUsers.map(user => { return { _id: user._id, username: user.username } });
    console.log("Users: ")
    console.table(users);


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
    })
    const createdThoughts = await Thought.create(thoughtsWithUserId);
    const thoughts = createdThoughts.map(thought => { return { _id: thought._id, thoughtText: thought.thoughtText, user: thought.user } });
    console.log("Thoughts: ")
    console.table(thoughts);

    // Updating Batman's thought items....anytime you update, you need to push the new item to update array and keep the original items in array 
    // const result = await User.findByIdAndUpdate(thoughts[0].user, {thoughts: [thoughts[0]._id, thoughts[1]._id]}, {new: true});
    await User.findByIdAndUpdate(thoughts[0].user, {thoughts: thoughts[0]._id}, {new: true});
    await User.findByIdAndUpdate(thoughts[0].user, {$push: {thoughts: thoughts[1]._id}}, {new: true});
    await User.findByIdAndUpdate(thoughts[0].user, {$push: {thoughts: thoughts[3]._id}}, {new: true});
    const result = await User.findByIdAndUpdate(thoughts[0].user, {$pull: {thoughts: thoughts[3]._id}}, {new: true});
    console.log(result);




    // /////////////////////////////////////////////////////////////////////////////////////////////////
    // // Seeding the User's Friends Array, Tranform data to include the new ObjectId for each user
    // // console.log(friendsData);
    // users.forEach(async (user) => {
    //     const createdUserWithFriends = friendsData.filter(item => item.username === user.username);
    //     if (createdUserWithFriends.length) {
    //         const friendsListByUsername = createdUserWithFriends[0].friends;
    //         const friendsListById = [];
    //         console.log(friendsListByUsername);

    //         friendsListByUsername.forEach(friend => {
    //             const friendData = users.filter(user => user.username === friend);
    //             if (friendData.length) {
    //                 friendsListById.push(friendData[0]._id);
    //             }
    //         });
    //         console.log(friendsListById);

    //         console.log("Hellow")
    //         console.log(user);
    //         // const result = User.findOneAndUpdate({ _id: user._id },
    //         //     {
    //         //         friends: friendsListById
    //         //     }
    //         // );
    //         // console.log(result);


    //         // const friendsData2 = [];
    //         // friendsList.forEach(friend => {
    //         //     const friendData = users.filter(user => user.username === friend);
    //         //     if (friendData.length) {
    //         //         friendsData2.push(friendData[0]._id);
    //         //     }
    //         // });
    //         // console.log(friendsData2);

    //         // const result = await User.findOneAndUpdate(
    //         //     { _id: userData[0]._id },
    //         //     {
    //         //         friends: friendsData2
    //         //     });

    //         // console.log(result);
    //     }
    // })
    // const friendsUserIds = [];
    //  ///////////////////////////////////////////////////////////////////////////////


    // ////////////////////////////////////////////////////////////////////////////
    // const userUsername = "Batman"
    // const userData = users.filter( user => user.username === userUsername);
    // console.log(`user: ${userUsername} => ${userData[0]._id}`);
    // const friendUsername = "Gordon";
    // const friendData = users.filter( user => user.username === friendUsername);
    // console.log(`friend: ${friendUsername} => ${friendData[0]._id}`);

    // // const result = await User.findOneAndUpdate(
    // //     {_id: userData[0]._id },
    // //     {
    // //         friends: [friendData[0]._id]
    // //     });

    // // console.log(result);

    // const friendsList = [ "Gordon", "Lucius Fox"];
    // const friendsData2 = [];
    // friendsList.forEach(friend => { 
    //     const friendData = users.filter(user => user.username === friend);
    //     if(friendData.length){ 
    //         friendsData2.push(friendData[0]._id);
    //     }
    // });
    // console.log(friendsData2);

    // const result = await User.findOneAndUpdate(
    //     {_id: userData[0]._id },
    //     {
    //         friends: friendsData2
    //     });

    // console.log(result);
    //     //////////////////////////////////////////////////






    console.info('Seeding complete! 🌱');
    process.exit(0);
});