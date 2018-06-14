//DOM ELEMENTS
var guessCounterElem = $('#guess-counter');
var randomNumElem = $('#random-num');
var startButtonElem = $('#start-game');
var crystalElem = $('.crystal');
var winsElem = $('#wins');
var lossesElem = $('#losses');

//Random Number Generator 
function randomNumGenerator(max, min){
	return Math.floor(Math.random()*(max - min + 1) + min);
}

//Assign data val to each crystal
function assignValues(){
    $(".crystal").each(function(){
        $(this).attr("data-val",function(){
            return randomNumGenerator(1, 12);
        });
        console.log($(this).attr("data-val"));
    });
}

//INSTANTIATE VARIABLES
var guessCounter = 0;
var randomNum;
var winCount = 0;
var lossCount = 0;

//assign random numbers to all crystals
//set random number variable
//write random num value to DOM
function resetGame(){
    guessCounter = 0;
    guessCounterElem.text(guessCounter);
    randomNum = randomNumGenerator(19, 120);
    randomNumElem.text(randomNum);
    assignValues();
}

startButtonElem.click(function(){
    console.log('click!');
    newGame();
});
//PLAY GAME FUNCTION
function newGame(){
    resetGame();
    //listen for clicks on crystals
    //select the data value of the clicked crystal, parse to integer
    //add value of crystal to the guess value
    //write updated guess value to DOM
    
    crystalElem.on('click', function(){
        if (guessCounter <= randomNum) {
                var crystalVal = parseInt($(this).attr('data-val')); 
                guessCounter += crystalVal;
                console.log(guessCounter);
                guessCounterElem.text(guessCounter);  
        }
        else if (guessCounter === randomNum){
            alert('You Win');
            console.log('win');
            winCount++;
            winsElem.text(winCount);
            resetGame();
        }
       else {
            alert('You Lose');
            console.log('lose');
            lossCount++;
            lossesElem.text(lossCount);  
            resetGame();
        }
    });   
}


