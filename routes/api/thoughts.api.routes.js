const router = require("express").Router();
const { User, Thought } = require('../../models');



// Route: /api/thoughts/
// GET to get all thoughts
router.get("/", async (req, res) => {
    try {
        const data = await Thought.find()
            .populate({ path: "user", select: "_id username email" })
            .populate({ path: "reactions", populate: { path: "user", select: "_id username email" } })
            .select("-__v");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});



// Route: /api/thoughts/:thoughtId
// GET to get a single thought by its _id
router.get("/:thoughtId", async (req, res) => {
    try {
        // const data = "GET to get a single thought by its _id"
        const data = await Thought.findById({ _id: req.params.thoughtId })
            .populate({ path: "user", select: "_id username email" })
            .populate({ path: "reactions", populate: { path: "user", select: "_id username email" } })
            .select("-__v");
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.thoughtId + ' not found.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});



// Route: /api/thoughts/
// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// // example data
// {
// 	"user" : "65601dea9eb742d3f5a5622e",
// 	"thoughtText": "Why so serious?"
// }
router.post("/", async (req, res) => {
    try {
        if (!req.body.user) {
            res.status(400).json({ message: 'Request needs a userId.' });
            return;
        }
        const thoughtData = await Thought.create(req.body);
        if (!thoughtData) {
            res.status(400).json({ message: 'New thought data not found.' });
            return;
        }
        const userData = await User.findByIdAndUpdate(req.body.user,
            { $push: { thoughts: thoughtData._id } },
            { new: true }
        );
        res.status(200).json({ thoughtData: thoughtData, userData: userData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});



// Route: /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
// Example Data:
// {
//     "reactionBody" : "I'm coming to get you!",
//     "user":"batman's userId"
// }
router.post("/:thoughtId/reactions", async (req, res) => {
    try {
        const data = await Thought.findByIdAndUpdate(req.params.thoughtId,
            { $push: { reactions: { reactionBody: req.body.reactionBody, user: req.body.user } } },
            { new: true }
        )
            .populate({ path: "user", select: "_id username email" })
            .populate({ path: "reactions", populate: { path: "user", select: "_id username email" } });
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});



// Route: /api/thoughts/:thoughtId
// PUT to update a thought by its _id
router.put("/:thoughtId", async (req, res) => {
    try {
        const data = await Thought.findByIdAndUpdate(req.params.thoughtId,
            { ...req.body },
            { new: true }
        )
            .populate({ path: "user", select: "_id username email" })
            .populate({ path: "reactions", populate: { path: "user", select: "_id username email" } });
        if (data[0] === 0) {
            res.status(400).json({ message: 'Record ' + req.params.thoughtId + ' is not found or updated.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});



// Route: /:thoughtId/reactions/:reactionId
// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
    try {
        const data = await Thought.findByIdAndUpdate({ _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        )
            .populate({ path: "user", select: "_id username email" })
            .populate({ path: "reactions", populate: { path: "user", select: "_id username email" } });
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.reactionId + ' not found.' });
            return;
        }
        res.status(200).json({ status: "Record deleted", updatedThought: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});



// Route: /api/thoughts/:thoughtId
// DELETE to remove a thought by its _id
router.delete("/:thoughtId", async (req, res) => {
    try {
        const data = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.thoughtId + ' not found.' });
            return;
        }
        res.status(200).json({ status: "Record deleted", record: data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});


module.exports = router;