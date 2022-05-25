const Note = require('../models/Note')
const User = require('../models/User')

const notesRouter = require('express').Router()

notesRouter.get('/', (request, response) => {
   Note
   .find({})
   .populate('user',{ username: 1 })
   .then((notes)=>{
      return response.status(200).json(notes)
   })
})
notesRouter.post('/', async (request, response) => {
   const {title, content, userId} = request.body
   const user = await User.findById(userId)
   const newNote = new Note({
      title,
      content,
      important: false,
      date: new Date(Date.now()),
      user: user._id
   })
   const savedNote = await newNote.save()
   user.notes = user.notes.concat(savedNote.id)
   await user.save()
   response.status(200).json(savedNote)
})

module.exports = notesRouter