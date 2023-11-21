const router = require("express").Router();


// Route: /api/users/
// GET all users
router.get("/", async (req, res) => {
    try {
        const data = "GET all users"
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route: /api/users/:userId
// GET a single user by its _id and populated thought and friend data
router.get("/:userId", async (req, res) => {
    try {
        const data = "GET a single user by its _id and populated thought and friend data";
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.userId + ' not found.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route: /api/users/
// POST a new user:
// // example data
// {
//     "username": "lernantino",
//         "email": "lernantino@gmail.com"
// }
router.post("/", async (req, res) => {
    try {
        const data = "POST a new user";
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});



// Route: /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
router.post("/:userId/friends/:friendId", async (req, res) => {
    try {
        const data = "POST to add a new friend to a user's friend list. userId: " + req.params.userId + " friendId: " + req.params.friendId;
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Route: /api/users/:userId
// PUT to update a user by its _id
router.put("/:userId", async (req, res) => {
    try {
        const data = "PUT to update a user by its _id";
        if (data[0] === 0) {
            res.status(400).json({ message: 'Record ' + req.params.userId + ' is not found or updated.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});



// Route: /api/users/:id
// DELETE to remove a friend from a user's friend list
router.delete("/:userId/friends/:friendId", async (req, res) => {
    try {
        const data = "DELETE to remove a friend from a user's friend list. userId: " + req.params.userId + " friendId: " + req.params.friendId;
        if (!data) {
            res.status(404).json({ message: 'Record not found.' });
            return;
        }
        res.status(200).json({ status: "Record " + req.params.friendId + " deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});



// Route: /api/users/:id
// DELETE to remove user by its _id  => BONUS: Remove a user's associated thoughts when deleted.
router.delete("/:userId", async (req, res) => {
    try {
        const data = "DELETE to remove user by its _id";
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.userId + ' not found.' });
            return;
        }
        res.status(200).json({ status: "Record " + req.params.userId + " deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;