const express     = require("express");
const router      = express.Router();
const fs          = require("fs");
const words       = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


function randomWordGen() {
  let n = Math.floor((Math.random() * 235000) + 1);
  let randomWord = words[n];
  console.log(randomWord);
};








module.exports = router;
