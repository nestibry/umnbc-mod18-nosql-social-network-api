const router = require("express").Router();


// Route: /api/template/
// GET all records
router.get("/", async (req, res) => {
    try{
        const data = "GET All records"
        res.status(200).json(data);
    } catch(err){
        res.status(500).json(err);
    }
});

// Route: /api/template/:id
// GET one record by primary key
router.get("/:id", async (req, res) => {
    try{
        const data = "GET one record by primary key"
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
            return;
        }
        res.status(200).json(data);
    } catch(err){
        res.status(500).json(err);
    }
});

// Route: /api/template/
// Create a new record
router.post("/", async (req, res) => {
    try{
        const data = "Create a new record"
        res.status(200).json(data);
    } catch(err){
        res.status(500).json(err);
    }
});

// Route: /api/template/:id
// Update a record
router.put("/:id", async (req, res) => {
    try{
        const data = "Update a record";
        if(data[0] === 0) {
            res.status(400).json({ message: 'Record ' + req.params.id + ' is not found or updated.' });
            return;
        }
        res.status(200).json(data);
    } catch(err){
        res.status(500).json(err);
    }
});

// Route: /api/template/:id
// Delete a record
router.delete("/:id", async (req, res) => {
    try{
        const data = "Delete a record";
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
            return;
        }
        res.status(200).json({status:"Record " + req.params.id + " deleted"});
    } catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;