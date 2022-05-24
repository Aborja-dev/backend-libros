const Note = require("../models/Note");

const saveNotes = async (notes) => {
   notes.forEach(async (_note) => {
      const note = new Note(_note)
      await note.save()
   });
}

module.exports = saveNotes