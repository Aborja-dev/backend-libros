require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')

const Note = require('./models/Note')
const app = express()
app.use(cors())
app.use(express.json())


app.get('/api/notes', (request, response) => {
   Note.find({})
      .then((notes)=>{
         return response.status(200).json(notes)
      })
})
app.post('/api/notes', (request, response) => {
   console.log(request.body)
   const {title, content} = request.body
   const newNote = new Note({
      title,
      content,
      important: false,
      date: new Date(Date.now())
   })
  newNote.save().then(savedNote=>{
     response.status(200).json(savedNote)
  })
})
app.use((req,res)=>{
   return res.status(404).end()
})
const PORT = 3002
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})

module.exports = {app, server}