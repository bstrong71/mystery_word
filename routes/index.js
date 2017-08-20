const express     = require("express");
const router      = express.Router();
const fs          = require("fs");
const wordPool    = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

function randomWordGen() {
  let n = Math.floor((Math.random() * 235000) + 1);
  return wordPool[n];
};

function startGame () {
  let randomWord = randomWordGen();
  let solutionLetters = randomWord.split("");
  let arr = [];
  for (var i = 0; i < solutionLetters.length; i++) {
    console.log(solutionLetters[i]);
    let eachSoluLetter = {
      letter: solutionLetters[i],
      guessed: false,
      placeholder: "_"
    };
    arr.push(eachSoluLetter);
  };
  return arr;
}

router.get("/", function(req, res) {

  let game = req.session.game;

  // Check for current game
  // If not current game, create a new one
  if (!game) {
    game = req.session.game = {};
    game.word = startGame();
    game.lettersGuessed = [];
  }

  res.render("game", {word: game.word, lettersGuessed: game.lettersGuessed });
})

router.post("/", function(req, res) {

  let game = req.session.game;

  console.log(req.body.guess);
  let guessObj = {guess: req.body.guess};
  for (var j = 0; j < game.word.length; j++) {
    if(guessObj.guess === game.word[j].letter){
      console.log("success");
      game.word[j].guessed = true;
    } else {
      console.log("did not match");
    }
  }
  game.lettersGuessed.push(guessObj);
  console.log(game.lettersGuessed);

  res.redirect("/");
})


module.exports = router;
