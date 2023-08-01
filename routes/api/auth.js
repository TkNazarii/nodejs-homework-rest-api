const express = require('express')
const {validateBody} = require('../../middleware/index')
const {schemas} = require('../../models/users') 

const ctrl = require('../../controllers/auth')

const router = express.Router()

router.post('/register', validateBody(schemas.registerSchema), ctrl.register)

module.exports = router

