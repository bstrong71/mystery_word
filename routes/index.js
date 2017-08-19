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

router.get("/", function(req, res) {
  console.log(word);
  res.render("game", {word: word});
})

router.post("/", function(req, res) {
  console.log(req.body.guess);
  for (var j = 0; j < word.length; j++) {
    if(req.body.guess === word[j].letter){
      console.log("success");
      word[j].guessed = true;
    
    } else {
      console.log("did not match");
    }
  }
  res.redirect("/");
})


module.exports = router;
