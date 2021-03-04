const express = require("express");
const token = require("../controllers/tokens");
const router = express.Router();

router.post("/", token.blistToken, (req, res) => {
    return res.status(200).send("Succesfully logged out...");
});

module.exports = router;