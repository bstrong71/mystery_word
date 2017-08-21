const express     = require("express");
const router      = express.Router();
const fs          = require("fs");
const wordPool    = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
let eachSoluLetter = {};

// returns random word from internal dictionary//
function randomWordGen() {
  let n = Math.floor((Math.random() * 235000) + 1);
  return wordPool[n];
};
// returns word to be guessed to start game //
function startGame () {
  eachSoluLetter = {};
  let randomWord = randomWordGen();
  let solutionLetters = randomWord.split("");
  let arr = [];
  for (var i = 0; i < solutionLetters.length; i++) {
    console.log(solutionLetters[i]);
      eachSoluLetter = {
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
  // Checks for current game //
  // If no current game, create a new one //
  if (!game) {
    game = req.session.game = {};
    game.word = startGame();
    game.lettersGuessed = [];
    game.tries = 8;
  }
  res.render("game", {word: game.word, lettersGuessed: game.lettersGuessed, tries: game.tries});
})

router.get("/reset", function(req, res){
  req.session.destroy();
  res.redirect("/");
})

router.post("/", function(req, res) {

  let game = req.session.game;

  let guessObj = {guess: req.body.guess};
  let correctGuessMade = 0;
  let ltrArray = game.lettersGuessed;
  let oops = "You alread guessed that letter. Guess again.";
  console.log(guessObj.guess);
  console.log(ltrArray);
  // change uppercase guess to lowercase //
  guessObj.guess = guessObj.guess.toLowerCase();

  if(ltrArray.indexOf(guessObj.guess) !== -1) {
    console.log("Guess again");
    res.render("game", {word: game.word, lettersGuessed: game.lettersGuessed, tries: game.tries, oops: oops});
  } else {

    for (var j = 0; j < game.word.length; j++) {
      if(guessObj.guess === game.word[j].letter){
        console.log("success");
        game.word[j].guessed = true;
        correctGuessMade += 1;
      } else {
        console.log("did not match");
      }
    }
    game.lettersGuessed.push(guessObj.guess);
  // adjust number of guesses left //
    if((correctGuessMade === 0) && (game.tries > 1)){
      game.tries -= 1;
    } else if ((correctGuessMade === 0) && (game.tries === 1)){
        game.tries -= 1;
      } else if ((correctGuessMade === 0) && (game.tries === 0)){
          res.render("loser");
          return;
        } else {}
    }
    console.log("eachSoluLetter " + eachSoluLetter);
    console.log("game.word " + game.word);
    console.log("game.word.placeholder "+ game.word.placeholder);

    


  res.redirect("/");
})


module.exports = router;
