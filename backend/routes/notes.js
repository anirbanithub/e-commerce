const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//To fetch notes of the user ,/api/notes/fatchusernotes
router.get("/fatchusernotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: "Some error occured" });
  }
});

//To create notes of the user ,/api/notes/createnotes
router.post(
  "/createnotes",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Enter a valid Description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag, price} = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notes = new Notes({
        title,
        description,
        tag,
        price,
        user: req.user.id,
      });
      const savedNote = await notes.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ errors: "Some error occured" });
    }
  }
);

//update the existing note,/api/notes/updatenote/:id
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag, price } = req.body;

    //create a newNote obj
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    if (price) {
      newNote.price = price;
    }

    //find and checking for validation
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    //updating note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: "Some error occured" });
  }
});

// To delete the notes -> "/api/notes/deleteNotes/:id"
router.delete("/deleteNotes/:id", fetchuser, async (req, res) => {
    try {

      //find and checking for validation
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
  
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed!");
      }
  
      //deleting the note
      note= await Notes.findByIdAndDelete(req.params.id);
      res.json({"Success":"Note has been deleted!",note:note});
      
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ errors: "Some error occured" });
    }
  });

module.exports = router;
