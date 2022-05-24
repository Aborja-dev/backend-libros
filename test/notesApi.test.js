const supertest = require('supertest')
const Note = require('../models/Note')
const saveNotes = require('../helpers/helpers')
const {app, server} = require('../index')
const mongoose = require('mongoose')
const api = supertest(app)
const { notes } = require('./mock/notes')
const { NotesInDB } = require('../helpers/test_helpers')


describe('pruebas de la api', ()=>{
   beforeEach(async ()=>{
      await Note.deleteMany({})
      await saveNotes(notes)
   })
   test('obtener todas las notas', async ()=>{
      await api
         .get('/api/notes')
         .expect(200)
         .expect('Content-Type', /application\/json/)
      const result = await NotesInDB()
      expect(result).toHaveLength(notes.length)
   }) 
   test('crear nueva nota', async ()=>{
      const newNote = {
         title: 'lavar',
         content: 'lavar la ropa'
      }
      await api
         .post('/api/notes')
         .send(newNote)
         .expect(200)
         .expect('Content-Type', /application\/json/)
      const result = await NotesInDB()
      const contents = result.map(({content})=>content)
      expect(contents).toContain(newNote.content)
   }) 
   afterAll(async () => {
		await mongoose.connection.close()
		server.close()
	}) 
})