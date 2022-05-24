const Note = require("../models/Note")

const NotesInDB = async ()=>{
   const notes = await Note.find({})
   return notes
}

module.exports = {NotesInDB}