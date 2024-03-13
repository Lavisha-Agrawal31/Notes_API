const express = require("express");
const auth = require("../middleware/auth");
const { getNotes, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const noteRouter = express.Router();

// we can call this end points only when we are having valid tokens

noteRouter.get("/", auth , getNotes)

noteRouter.post("/", auth , createNote );

noteRouter.delete("/:id", auth , deleteNote); // we have to pass id so that it can understand which note it has to delete

noteRouter.put("/:id", auth , updateNote);

module.exports = noteRouter;