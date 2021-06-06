const express = require("express");
const router = express.Router();
const { isUserAuth } = require("../shared/auth");
const {signIn, signUp, justChecking} = require("../controllers/user.server.controller")


router.get("/", isUserAuth, justChecking)

router.post( "/login",signIn );

router.post("/signup", signUp);




module.exports = router;