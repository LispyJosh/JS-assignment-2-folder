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
    /* if food is eaten */
    if(snake[0].x == foodX && snake[0].y == foodY){ /*if the cordinates line up with snake, it will eat the apple */
        score+=1; /*add 1 to score */
        scoreText.textContent = score; /*change the score text */
        createFood(); /*then create a new food object */
    }
    else{
        snake.pop(); /*this will elimate tail everytime the snake moves */
    }
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
    const keyPressed = event.keyCode;
    console.log(keyPressed); /*found these in the console */
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40

    const goingUp = (yVelocity == -unitSize)
    const goingDown = (yVelocity == unitSize)
    const goingRight = (xVelocity == unitSize)
    const goingLeft = (xVelocity == -unitSize)

    switch(true){
        case(keyPressed == LEFT && !goingRight): /*this stops us from going into our body and cutting through */ /*go left you cant then go right straight away */
            xVelocity = -unitSize; /*if I want to go left */
            yVelocity = 0; /* we are no longer going up or down */
            break; /*to exit statement */

        case(keyPressed == UP && !goingDown): /*this stops us from going into our body and cutting through */ /*go up you cant then go down straight away */
        xVelocity = 0; /*if I want to go up */
        yVelocity = -unitSize; 
        break; /*to exit statement */    

        case(keyPressed == RIGHT && !goingLeft): /*this stops us from going into our body and cutting through */ /*go right you cant then go left straight away */
        xVelocity = unitSize; /*if I want to go right */
        yVelocity = 0; 
        break; /*to exit statement */   
        
        case(keyPressed == DOWN && !goingUp): /*this stops us from going into our body and cutting through */ /*go Down you cant then go up straight away */
        xVelocity = 0; /*if I want to go down */
        yVelocity = unitSize; 
        break; /*to exit statement */ 
    }
    

};
function checkGameOver(){

    /* for the border */
    switch(true){
        case (snake[0].x < 0): /* less than 0, did we go over the left border */
            running = false;
            break; 
    
        case (snake[0].x >= gameWidth): /* is greater than or equal to the game width, did we go over the right border */
            running = false;
            break;
            
        case (snake[0].y < 0): /* is less than 0, did we go over the top border */
            running = false;
            break;    
            
        case (snake[0].y >= gameHeight): /* is greater than or equal to the game height, did we go over the bottom border */
            running = false;
            break;
    }

    /*for hitting it's own body */

    
};
function displayGameOver(){};
function resetGame(){};