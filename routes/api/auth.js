const express = require('express')
const {validateBody, authenticate, upload} = require('../../middleware/index')
const {schemas} = require('../../models/users') 

const ctrl = require('../../controllers/auth')

const router = express.Router()
// sign up
router.post('/register', validateBody(schemas.registerSchema), ctrl.register)

router.get("/verify/:verificationCode", ctrl.verifyEmail)

router.post("/verify/", validateBody(schemas.emailSchema), ctrl.resendVerifyEmail)

// sign in
router.post('/login', validateBody(schemas.loginSchema), ctrl.login)

router.get("/current", authenticate, ctrl.getCurrent)

router.post("/logout", authenticate, ctrl.logout)

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)

module.exports = router

