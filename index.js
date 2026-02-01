var words = [
    'bananas',
    'grapes',
    'carousel',
    'milkshake',
    'javascript',
    'limousine',
    'chocolate',
    'programming',
    'meatloaf',
    'ukulele',
    'mango'
  ]
  
  var wordtoguessEL = document.getElementById("word-to-guess");
  var remainingguessesEL = document.getElementById("remaining-guesses");
  var incorrectlettersEL = document.getElementById("incorrect-letters");
  var previouswordEL = document.getElementById("previous-word");
  var winsEL = document.getElementById("wins");
  var lossesEL = document.getElementById("losses");

  var wins = 0;
  var losses = 0;
  var word, displayWord, remainingGuesses, incorrectLetters;

  function resetGame() {
    word = words[Math.floor(Math.random() * words.length)];
    displayWord = Array(word.length).fill("_");
    remainingGuesses = 10;
    incorrectLetters = [];
  
    wordtoguessEL.innerHTML = displayWord.join("");
    remainingguessesEL.innerHTML = remainingGuesses;
    incorrectlettersEL.innerHTML = "";
  }

  resetGame();
  
  document.onkeyup = function (e) {
    // filter key presses
    var key = e.key.toLowerCase();
    if (!/[a-z]/.test(key) || incorrectLetters.includes(key) || displayWord.includes(key)) return;

    // compare key to word
    if (word.includes(key)) {
      for (var i = 0; i < word.length; i++) {
        if (word[i] === key) {
          displayWord[i] = key;
        }
      }
    } else {
      remainingGuesses--;
      incorrectLetters.push(key);
    }
  
    // if correct/fail, move to the next word
      if (remainingGuesses === 0) {
        console.log("losses");
        losses++;
        lossesEL.innerHTML = losses;
        previouswordEL.innerHTML = word;
        resetGame(); // show previous word only when round ends
      } else if (displayWord.join("") === word) {
        wins++;
        winsEL.innerHTML = wins;
        previouswordEL.innerHTML = word; // show previous word only when round ends
        resetGame();
      }
  
    wordtoguessEL.innerHTML = displayWord.join("");
    incorrectlettersEL.innerHTML = incorrectLetters.join(", ");
    remainingguessesEL.innerHTML = remainingGuesses;
  }

