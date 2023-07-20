const { exit } = require('process');
const app = require('./app')

const mongoose = require('mongoose');
// const { DB_HOST } = require('./config')

// global object with pasword
const { DB_HOST } = process.env

mongoose.connect(DB_HOST)
  .then(() => {
  app.listen(3000, () => {
	console.log("Server running: 3000")
	console.log("Database connection successful")
  }) 
})
  .catch(error => {
	console.log(error.message)
	process(exit(1))
});


// app.listen(3000, () => {
//   console.log("Server running: 3000")
// })

