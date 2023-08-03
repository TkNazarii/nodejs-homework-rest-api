const { exit } = require('process');
const app = require('./app')

const mongoose = require('mongoose');

const { DB_HOST } = process.env

mongoose.connect(DB_HOST)
  .then(() => {
  app.listen(3000, () => {
	console.log("Server running: http://localhost:3000")
  }) 
})
  .catch(error => {
	console.log(error.message)
	process(exit(1))
});


