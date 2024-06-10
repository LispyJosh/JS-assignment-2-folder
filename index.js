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

/* making the snake */

let snake = [ /*Square brackets are used to define arrays. An array is an ordered collection of elements. */
    {x:0, y:0} /*starting the snake at the top left */
]

6:30