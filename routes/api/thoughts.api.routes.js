const router = require("express").Router();



// Route: /api/thoughts/
// GET to get all thoughts
router.get("/", async (req, res) => {
    try {
        const data = "GET to get all thoughts"
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});



// Route: /api/thoughts/:id
// GET to get a single thought by its _id
router.get("/:id", async (req, res) => {
    try {
        const data = "GET to get a single thought by its _id"
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});



// Route: /api/thoughts/
// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// // example data
// {
//     "thoughtText": "Here's a cool thought...",
//         "username": "lernantino",
//             "userId": "5edff358a0fcb779aa7b118b"
// }
router.post("/", async (req, res) => {
    try {
        const data = "POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)"
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});



// Route: /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
router.post("/:thoughtId/reactions", async (req, res) => {
    try {
        const data = "POST to create a reaction stored in a single thought's reactions array field => thoughtId: " + req.params.thoughtId;
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});



// Route: /api/thoughts/:id
// PUT to update a thought by its _id
router.put("/:id", async (req, res) => {
    try {
        const data = "PUT to update a thought by its _id";
        if (data[0] === 0) {
            res.status(400).json({ message: 'Record ' + req.params.id + ' is not found or updated.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});



// Route: /api/thoughts/:id
// DELETE to remove a thought by its _id
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
    try {
        const data = "DELETE to remove a thought by its _id";
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.reactionId + ' not found.' });
            return;
        }
        res.status(200).json({ status: "Record " + req.params.reactionId + " deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});



// Route: /api/thoughts/:id
// DELETE to remove a thought by its _id
router.delete("/:thoughtId", async (req, res) => {
    try {
        const data = "DELETE to remove a thought by its _id";
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.thoughtId + ' not found.' });
            return;
        }
        res.status(200).json({ status: "Record " + req.params.thoughtId + " deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;