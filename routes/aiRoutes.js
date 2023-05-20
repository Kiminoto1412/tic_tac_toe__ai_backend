const express = require('express');

const router = express.Router();

const {nextAiMoves} = require("../controllers/aiController");


router.post("/nextmoves", nextAiMoves);

module.exports = router