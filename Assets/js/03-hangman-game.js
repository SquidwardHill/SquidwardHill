// Grab reference to DOM elements
var $newGameButton = document.getElementById("new-game-button");
var $placeholders = document.getElementById("placeholders");
var $guessedLetters = document.getElementById("guessed-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");


// Creat variables for game (wordbank, wins, losses, picked word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect letter bank)
var wordBank = ['crystals', 'patchoulie', 'natural', 'dreads', 'flowers', 'festivals'];
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var gameRunning = false;
var pickedWord = " ";
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

    // reset game and stats, pick new word
function newGame() {
    // reset all game info
    gameRunning = true;
    guessesLeft = 9;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];
   
    // Pick new word 
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log(pickedWord);
    // create placeholder values for picked word
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === " ") {
            pickedWordPlaceholderArr.push(" ");//automatically creates spaces so User doesn't have to guess a space
        }
        else {
            pickedWordPlaceholderArr.push("_");
        }
    }

    // Write all the new game info to the DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join("");// this turns it back into a string so there's not all the commas
    $guessedLetters.textContent = incorrectLetterBank;

}

// check to see if letter guessed is in the word
function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        // Run game logic
        guessedLetterBank.push(letter);

        // check if guessed letter is in my picked word
        for (var i = 0; i < pickedWord.length; i++) { //Goes thru string letter by letter
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                // if a match, swap out matching placeholder value for character
                pickedWordPlaceholderArr[i] = pickedWord[i];
               
            }
        }

        $placeholders.textContent = pickedWordPlaceholderArr.join("");
        checkIncorrect(letter);
        
    }
    else {
        if (!gameRunning) {
            alert("Hey mann, press start to play the game!")
        }
        else {
            alert("Sorry dude, you've guessed that letter already. Lay off the green!")//Just gives user some feedback
        }
    }
}

// Check for incorrects(letter)
function checkIncorrect(letter) {
    // Check to see if letter DIDN"T make it into our pickedPlaceHolder (therefore, incorrect)
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1)  {
        // Decrement guesses
        guessesLeft--;
        // Add incorrect letter to incorrectLetterBank
        incorrectLetterBank.push(letter);
         //Write incorrect letter bank to DOM
        $guessedLetters.textContent = incorrectLetterBank.join(" ");
        // update DOM guess count
        $guessesLeft.textContent = guessesLeft;
       
    }
    
    checkLose();
    checkWin();
} 


// checkLose
function checkLose() {
    if (guessesLeft <= 0) {
        losses++;
        $losses.textContent = losses;
        
        alert("Sorry mannn, the game is lost- but you are not. Peace and love!");
        gameRunning = false;
    }
}


// checkWin
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join("").toLowerCase()) {

        wins++;
        $wins.textContent = wins;
     
        alert("Righteous my dude, you've done it!");
        gameRunning = false;
    }
}



// Add onkeyup event to trigger letterGuess 
document.onkeyup = function(event) {
    //console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}
// Add eventListener for new game button 
$newGameButton.addEventListener("click", newGame);