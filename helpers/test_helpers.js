const Note = require("../models/Note")
const User = require('../models/User')
const NotesInDB = async ()=>{
   const notes = await Note.find({})
   return notes
}
const FoundInDB = async (Schema)=>{
   const all = await Schema.find({})
   return all
}
const getUserId = async ()=>{
   const user = await User.find({})
   return user[0].id
}

module.exports = {NotesInDB, FoundInDB, getUserId}