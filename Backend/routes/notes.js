const express = require("express");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

router.get('/getNotes', fetchUser, async(req, res)=>{
    try {
        const note = await Notes.find({user: req.user.id});
        res.json(note);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({err: "Wrong in get-notes"})
    }
});

router.post('/addNotes', fetchUser,[ body('title').isLength({min: 3}), body('description').isLength({min:5})], async(req, res)=>{
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({result: result.array()});
        }

        const {title, description, tag} = req.body;
        const newNote = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({err: "Wrong in add-notes"})
    }
});

router.put('/updateNotes/:id', fetchUser, async(req, res)=>{
    try {
        const {title, description, tag} = req.body;
        const newNote = {};

        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        if(tag){
            newNote.tag = tag;
        }

        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found!");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("You can't access it!");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new : true});
        res.json(note);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({err: "Wrong in update-notes"})
    }
});

router.delete('/deleteNotes/:id', fetchUser, async(req, res)=>{
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found!");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("You can't access it!");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json("Note has been deleted!");
    } catch (err) {
        console.log(err.message);
        res.status(500).json({err: "Wrong in delete-notes"})
    }
});

module.exports = router;