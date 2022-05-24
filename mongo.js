const mongoose = require('mongoose')
let connectionString = ''

if (process.env.NODE_ENV === 'test') {
   connectionString = process.env.MONGO_DB_URL_TEST
} else {
   connectionString = process.env.MONGO_DB_URL
}

mongoose.connect(connectionString)
   .then(()=>{
      console.log(`conexion a la base de datos en ${process.env.NODE_ENV}`);
   })
   .catch(()=>{
      console.log('ha ocurrido un error en la base de datos');
   })
