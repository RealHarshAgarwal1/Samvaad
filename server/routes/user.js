const express = require("express")
const router = express.Router();

const {otpSave} = require("../controllers/auth")

router.post("/otp-create",otpSave)

module.exports = router;