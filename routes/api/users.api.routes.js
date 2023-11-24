const router = require("express").Router();
const { User, Thought } = require('../../models');





// Route: /api/users/
// GET all users
router.get("/", async (req, res) => {
    try {
        const data = await User.find()
            .populate({ path: "friends", select: "_id username", options: { sort: { username: 1 } } })
            .populate("thoughts", "_id thoughtText")
            .sort({ username: 1 })
            .select("-__v");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

// Route: /api/users/:userId
// GET a single user by its _id and populated thought and friend data
router.get("/:userId", async (req, res) => {
    try {
        const data = await User.findById({ _id: req.params.userId })
            .populate({ path: "friends", select: "_id username email", options: { sort: { username: 1 } } })
            .populate({ path: "thoughts", populate: { path: "reactions", populate: { path: "user", select: "_id username email" } } })
            .select("-__v");
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.userId + ' not found.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

// Route: /api/users/
// POST a new user:
// // example data
// {
//     "username": "Joker",
//     "email": "joker@whysoserious.com"
// }
router.post("/", async (req, res) => {
    try {
        const data = await User.create(req.body);
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});



// Route: /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
router.post("/:userId/friends/:friendId", async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.userId,
            { $push: { friends: req.params.friendId } },
            { new: true }
        ).populate({ path: "friends", select: "_id username email", options: { sort: { username: 1 } } });
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});


// Route: /api/users/:userId
// PUT to update a user by its _id
router.put("/:userId", async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.userId,
            { ...req.body },
            { new: true }
        )
        if (data[0] === 0) {
            res.status(400).json({ message: 'Record ' + req.params.userId + ' is not found or updated.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});



// Route: /api/users/:id
// DELETE to remove a friend from a user's friend list
router.delete("/:userId/friends/:friendId", async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        ).populate({ path: "friends", select: "_id username email", options: { sort: { username: 1 } } });

        if (!data) {
            res.status(404).json({ message: 'Record not found.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});



// Route: /api/users/:id
// DELETE to remove user by its _id  => BONUS: Remove a user's associated thoughts when deleted.
router.delete("/:userId", async (req, res) => {
    try {
        const data1 = await User.findOneAndDelete({_id: req.params.userId});
        const data2 = await Thought.deleteMany({user: req.params.userId});
        if (!data1) {
            res.status(404).json({ message: 'User records not found.' });
            return;
        }
        // if (!data2) {
        //     res.status(404).json({ message: 'Thought records not found.' });
        //     return;
        // }
        res.status(200).json({status: "record deleted", record: data1});
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});


module.exports = router;