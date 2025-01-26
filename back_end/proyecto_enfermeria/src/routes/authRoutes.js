const express = require("express");
const { login, register } = require("../../controllers/authController");

const router = express.Router();

function test(){
    return "hello world"

}
router.get("/",test)
router.post("/register", register);
router.post("/login", login);

module.exports = router;
