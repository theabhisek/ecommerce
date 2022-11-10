const express = require('express')
const { registerUser, loginUser, logout, forgotPassword ,resetPassword, resetPasswords,register} = require('../controllers/userController')
const router = express.Router()
//front end
router.get("/",register)
//backend
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logout)
router.post("/password/forgot",forgotPassword)
router.get("/password/forgot/reset",resetPassword)
router.post("/password/:id",resetPasswords)
module.exports = router 