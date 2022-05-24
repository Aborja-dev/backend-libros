const mongoose = require('mongoose')
const URL_DB =  process.env.MONGO_DB_URL

mongoose.connect(URL_DB)
   .then(()=>{
      console.log('conexion a la base de datos');
   })
   .catch(()=>{
      console.log('ha ocurrido un error en la base de datos');
   })
