const express  = require("express");
const fs = require ("fs");
const router = express.Router();

let notes = require("../db/db.json");
router.get("/api/notes", function(req, res){
    res.json(notes);
})
router.post("/api/notes", function(req, res){
    if(notes.length < 1){
        req.body.id = 1
    } else {
        let lastID = notes[notes.length - 1].id
        req.body.id = lastID + 1
    }

    notes.push(req.body);
    fs.writeFileSync('./db/db.json' , JSON.stringify(notes))

    res.json(notes);
})
router.delete('/api/notes/:_id', function(req,res){
    let ID = req.params._id;
    notes = notes.filter(function(e){
        return e.id != ID;

    });
    fs.writeFileSync('./db/db.json' , JSON.stringify(notes))
    res.json(notes);
});

module.exports = router;