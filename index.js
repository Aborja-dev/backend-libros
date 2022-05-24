const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())

const notes = [
   {
      title: 'estudiar react',
      content: 'estudiar react para la prueba',
      important: true
   },
   {
      title: 'apuntes',
      content: 'repasar los apuntes de la escuela',
      important: false
   },
   {
      title: 'dormirse',
      content: 'dormirse temprano antes de las doce',
      important: true
   },
]

app.get('/api/notes', (request, response) => {
   response.status(200).json(notes)
})
app.post('/api/notes', (request, response) => {
   console.log(request.body)
   const {title, content} = request.body
   const newNote = {
      title,
      content,
      important: false
   }
   const notesArray = notes.concat(newNote)
  response.status(200).json(notesArray)
})
app.use((req,res)=>{
   return res.status(404).end()
})
const PORT = 3002
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})