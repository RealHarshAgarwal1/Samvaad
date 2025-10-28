const express = require("express")
const router = express.Router();

const {otpSave,signUp,logIn} = require("../controllers/auth")

router.post("/otp-create",otpSave)
router.post("/signup",signUp)
router.post("/login",logIn)

module.exports = router; 