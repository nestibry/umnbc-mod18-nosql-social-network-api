const router = require("express").Router();
const { User, Thought } = require('../../models');



// Route: /api/thoughts/
// GET to get all thoughts
router.get("/", async (req, res) => {
    try {
        const data = await Thought.find()
            .populate({ path: "user", select: "_id username email" })
            .populate({path: "reactions", populate: {path: "user", select: "_id username email"}}) 
            .select("-__v");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({status: "error", message:err.message});
    }
});



// Route: /api/thoughts/:thoughtId
// GET to get a single thought by its _id
router.get("/:thoughtId", async (req, res) => {
    try {
        // const data = "GET to get a single thought by its _id"
        const data = await Thought.findById({ _id: req.params.thoughtId })
            .populate({ path: "user", select: "_id username email" })
            .populate({path: "reactions", populate: {path: "user", select: "_id username email"}}) 
            .select("-__v");
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.thoughtId + ' not found.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({status: "error", message:err.message});
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
        const thoughtData = await Thought.create(req.body);
        if (!thoughtData) {
            res.status(400).json({ message: 'New thought data not found.' });
            return;
        }
        const userData = await User.findByIdAndUpdate(thoughtData.user,
            { $push: { thoughts: thoughtData._id} },
            { new: true }
        );
        res.status(200).json({thoughtData: thoughtData, userData: userData});
    } catch (err) {
        console.log(err);
        res.status(500).json({status: "error", message:err.message});
    }
});



// Route: /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
router.post("/:thoughtId/reactions", async (req, res) => {
    try {
        const data = "POST to create a reaction stored in a single thought's reactions array field => thoughtId: " + req.params.thoughtId;
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({status: "error", message:err.message});
    }
});



// Route: /api/thoughts/:thoughtId
// PUT to update a thought by its _id
router.put("/:thoughtId", async (req, res) => {
    try {
        const data = "PUT to update a thought by its _id";
        if (data[0] === 0) {
            res.status(400).json({ message: 'Record ' + req.params.thoughId + ' is not found or updated.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({status: "error", message:err.message});
    }
});



// Route: /:thoughtId/reactions/:reactionId
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
        console.log(err);
        res.status(500).json({status: "error", message:err.message});
    }
});



// Route: /api/thoughts/:thoughtId
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
        console.log(err);
        res.status(500).json({status: "error", message:err.message});
    }
});


module.exports = router;