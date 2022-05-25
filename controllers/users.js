
const User = require('../models/User')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
   const users = await User.find({}).populate('notes',{content: 1, date: 1, important: 1})
   return response.status(200).json(users)
})
usersRouter.post('/', (request, response) => {
   const {username, password, name} = request.body

   const newUser = bcrypt.hash(password, 10).then((passwordHash)=>{
      const _user = new User({
         username,
         passwordHash,
         name
      })
      return _user
   })
  newUser
   .then( (User)=>{
      return User.save()
   })
   .then((userSaved)=>{
      response.status(200).json(userSaved)
   }) 
})

module.exports = usersRouter