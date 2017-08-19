const express     = require("express");
const router      = express.Router();
const fs          = require("fs");
const words       = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
let randomWord;
let eachSoluLetter;
let word = [];

function randomWordGen() {
  let n = Math.floor((Math.random() * 235000) + 1);
  randomWord = words[n];
};

randomWordGen();

let solutionLetters = randomWord.split("");
for (var i = 0; i < solutionLetters.length; i++) {
  console.log(solutionLetters[i]);
  let eachSoluLetter = {
    letter: solutionLetters[i],
    guessed: false,
    placeholder: "_"
  };
  word.push(eachSoluLetter);
};
console.log({word});

router.get("/", function(req, res) {
  console.log("heeeeeeeeeelllllllllllllllloooooooooooooo");
  res.render("game", {word});
})



module.exports = router;
