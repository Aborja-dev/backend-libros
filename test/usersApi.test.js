const supertest = require('supertest')
const {app, server} = require('../index')
const mongoose = require('mongoose')
const api = supertest(app)

const User = require('../models/User')
const { users } = require('./mock/user')

const { FoundInDB } = require('../helpers/test_helpers')
const { saveAll } = require('../helpers/helpers')

describe('pruebas de la api de usuario', ()=>{
   beforeEach(async ()=>{
      await User.deleteMany({})
      await saveAll(users, User)
   })
   test('obtener todas los usuarios', async ()=>{
      await api
         .get('/api/users')
         .expect(200)
         .expect('Content-Type', /application\/json/)
      const result = await FoundInDB(User)
      expect(result).toHaveLength(users.length)
   }) 
   test('crear nuevo usuario', async ()=>{
      const newUser = {
         name: 'fernando',
         username: 'fer123',
         password: 'hola132'
      }
      await api
         .post('/api/users')
         .send(newUser)
         .expect(200)
         .expect('Content-Type', /application\/json/)
      const result = await FoundInDB(User)
      const usernames = result.map(({username})=>username)
      expect(usernames).toContain(newUser.username)
   }) 
   afterAll(async () => {
		await mongoose.connection.close()
		server.close()
	}) 
})