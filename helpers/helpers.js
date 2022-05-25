const Note = require("../models/Note");

const saveNotes = async (notes) => {
   notes.forEach(async (_note) => {
      const note = new Note(_note)
      await note.save()
   });
}
const saveAll = async (array, Schema) => {
   array.forEach(async (_el) => {
      const newEl = new Schema(_el)
      await newEl.save()
   });
}

module.exports = { saveNotes, saveAll }