let filled = [[false, false, false], 
              [false, false, false], 
              [false, false, false]];

let playerLetter = "x"; //placeholder, will fix logic later
let botLetter = "o"; //placeholder, will fix in same logic as playerLetter

function playerGuess(row, col, letter){
    //will fix appropriately later, may not even need this and just use fill in method with what box was clicked
    fill_in(row, col, letter);
}

function opponentGuess(letter){
    let row;
    let col;

    //making it do a random selection (0-2), i don't want to do super complex logic for this
    do{
        row = Math.floor(Math.random() * 3);
        col = Math.floor(Math.random() * 3);
    }while(!filled[row][col]);

    fill_in(row, col, letter);
}

function fill_in(row, col, letter){
    //todo: the rest of the stuff on the page that's related to this method
    filled[row][col] = true;
    //get the image related to either x or o, and then place itin the row, col place
    //todo: make a 3x3 2d array that tracks what's where, and that's how it'll be displayed
    //either that or just make it work better somehow i don't know
}

function startNewGame(){
    //making it empty at the start of each game
    filled = [[false, false, false], 
              [false, false, false], 
              [false, false, false]];
    //make the player choose x or o
    //make x be first, make o be second
    let turnAmount = 9;
    //is the player x? if no, do opponentGuess first, then turnAmount-=1
    for(let i = 0; i<turnAmount; i++){
        if(i%2 ==0){
            playerGuess(0, 0, platerLetter);
        } else{
            opponentGuess(0, 0, botLetter);
        }
    }

    //make the method for checking for win
    //display who won
    //make retry button appear, which will call startNewGame (basically just the button for start game with a different label)
}