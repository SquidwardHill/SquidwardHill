// Grab reference to DOM elements
var newGameButton = document.getElementById("new-game-button");
var placeholders = document.getElementById("placeholders");
var guessedLetters = document.getElementById("guessed-letters");
var guessesLeft = document.getElementById("guesses-left");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");

// Creat variables for game 
//(wordbank, wins, losses, picked word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect letter bank)
var userGuess = "";
var wordBankArr = ["cat", "dog", "fish", "bird", "black bear"];
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var gameRunning = false;
var pickedWord = " ";
var guessedLetterBank = []; // All letters guessed
var incorrectLetterBank = []; // only incorrect letters
var pickedWordPlaceholderArr = [] // correct letters

// New game function to reset all stats, pick new word and create placeholders
function newGame() {
    // reset all game info
    guessesLeft = 9;
    guessedLetterBank = [];
    gameRunning = true;
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];
    //pick random word from list
    pickedWord = wordBankArr[Math.floor(Math.random() * wordBankArr.length)];

    // Create Placeholders (__ _ _ _ ) of new picked word

    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === " ") {
            pickedWordPlaceholderArr.push(" ")
            //pickedWordPlaceholderArr[i] = pickedWord[i]; //automatically creates spaces so User doesn't have to guess a space
        }
        else {
            pickedWordPlaceholderArr.push("_")
        }
    }
console.log(pickedWord);
    // Write all new game info to the DOM
    guessesLeft.textContent = guessesLeft;
    placeholders.textContent = pickedWordPlaceholderArr.join(""); // this turns it back into a string so there's not all the commas
    guessedLetters.textContent = incorrectLetterBank;
}

// check for letterGuess(letter)
function letterGuess(theGuess) {
    console.log("Hello from letter guess");
    // Run game logic
    guessedLetterBank.push(theGuess);

    //compare event.key to the pickedWord
    for (var i = 0; i < pickedWord.length; i++) {
        console.log("pickedWord >>>" + pickedWord[i])
        console.log("theGuess >>>" + theGuess);
        if (pickedWord[i].toLowerCase() === theGuess.toLowerCase()) {

            // if a match, swap out that character in the placeholder with the actual charater
            pickedWordPlaceholderArr[i] = pickedWord[i];
            console.log('yo pickedplaceholderarrrrrr' + pickedWordPlaceholderArr);
        } 
    }

    placeholders.textContent = pickedWordPlaceholderArr.join("");
    console.log(pickedWordPlaceholderArr);
    checkIncorrect(theGuess);
}

// Check for Incorrect(letter)
function checkIncorrect(letter) {
    //index of returns a negative value if not found
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1) 
    {
        // decrement guesses
        guessesLeft--;
        // write new amount of guesses left to DOM
        guessesLeft.textContent = guessesLeft;
        // add incorrect letters to incorrectLetterbank
        incorrectLetterBank.push(letter);
        // Write new bank of incorrect letters guessed to DOM
        guessedLetters.textContent = incorrectLetterBank.join(" ");
    }

    checkLose();
    checkWin();

}

// checkLose
function checkLose() {
    if (guessesLeft <= 0) {
        losses++;
        losses.textContent = losses;
        alert("YOU LOST! Bitttttcccchhhhhh :( ");
        gameRunning = false;                
    }
}

// checkWin 
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join("").toLowerCase()) {
        wins++;
        wins.textContent = wins;
        alert("YOU WIN");
        gameRunning = false;
    }
}

// Add eventlistner for new game button
newGameButton.addEventListener("click", newGame);

// Add onkeyup event to trigger LetterGuess
document.onkeyup = function (event) {
    console.log(event.key);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
        console.log(event.key);
    }
}