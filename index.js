const gameBoard = document.querySelector("#gameBoard"); /* canvas (inside square) */
const ctx = gameBoard.getContext("2d"); /* to paint on canvas */ /*cxt = context */
const scoreText= document.querySelector("#scoreText") /*score text as variable */ /*we selected the ID */
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width; /* these are variables to keep the size of the gameboard I believe! */
const gameHeight = gameBoard.height;

/* colouring time */

const boardBackground= "white"; /* colour of canvas */
const snakeColor = "lightgreen"; /* colour of snake */
const snakeBorder = "black"; /* outline of snake */
const foodColor = "red"; /* the thing the snake eat */

/* items */

const unitSize = 25; /*size of everything within our game */
let running = false;
let xVelocity = unitSize;  /* how fast we move on the X axis in one game tic */ /*we will be moving 25px on the X axis */
let yVelocity = 0; /* 0 means we arent moving up or donw */
let foodX;  /*cordinates for our food */
let foodY;
let score = 0;

/* making the snake */ /* making an array of objects/body */

let snake = [ /*Square brackets are used to define arrays. An array is an ordered collection of elements. */
    {x: unitSize * 4, y:0},
    {x: unitSize * 3, y:0},
    {x: unitSize * 2, y:0}, /* seperate object due to comma */
    {x: unitSize, y: 0}, /*each one is a body part */
    {x: 0, y:0} /*starting the snake at the top left */
];

/* adding an event listener to listen for key events */

window.addEventListener("keydown", changeDirection); /* the even is keydown */
resetBtn.addEventListener("click", resetGame); /* when we click resetbtn, we will envoke the reset game function */

gameStart(); /*function for game */


function gameStart(){
    running= true; /*the game is currently running */
    scoreText.textContent = score; /*the score text = the score, initially 0 */
    createFood(); 
    drawFood();
    nextTick(); /* what we want every round*/
};
function nextTick(){
    if(running){ /*the game is currently running */
        setTimeout(()=>{ /* order of steps */ /*using Arrow Function */
            clearBoard(); /*first clear board */
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75) /*how often a game tick occurs*/ /*75 milliseconds*/
    }
    else{ /*else Statement! */
        displayGameOver(); /* if the game isnt running, it's game over */
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground; /*the background colour I picked */
    ctx.fillRect (0, 0, gameWidth, gameHeight); 
}; /*for re-painting the board*/
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize; /*this makes it go in places divisible by 25 size, idk Y*/
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize); /*random number */
    foodY = randomFood(0, gameWidth - unitSize);


}; /* find a random place to place a food item*/
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize); /*to fill a rectangle */
}; /* I will have to paint the food within gameboard */
function moveSnake(){
    const head = {x: snake[0].x + xVelocity, /*making the head of the snake (X cordinate/front part) */
                    y: snake[0].y + yVelocity};
    snake.unshift(head);
};
function drawSnake(){
    ctx.fillStyle = snakeColor; /*colour we chose */
    ctx.strokeStyle = snakeBorder; 
    snake.forEach(snakePart => { /*(for every snake part)*/
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize); /*each snake part has an X and Y coordinate */ /*how big the snake part is (25)*/
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){ /* event added by chatGPT */

};
function checkGameOver(){};
function displayGameOver(){};
function resetGame(){};

