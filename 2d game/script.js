// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 1100;
canvas.height = 500;

// Set the snake properties
let snakeX = 200;
let snakeY = 200;
let snakeSpeedX = 10;
let snakeSpeedY = 0;
let snakeBody = [];
let snakeLength = 5;

// Set the apple properties
let appleX = Math.floor(Math.random() * 40) * 10;
let appleY = Math.floor(Math.random() * 40) * 10;

// Set the score
let score = 0;

// Draw the game board
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
  ctx.fillStyle = 'green';
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i].x, snakeBody[i].y, 10, 10);
  }
}

// Draw the apple
function drawApple() {
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX, appleY, 10, 10);
}

// Update the game state
function update() {
  // Move the snake
  snakeX += snakeSpeedX;
  snakeY += snakeSpeedY;

  // Check for collision with the wall or itself
  if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || checkCollision()) {
    gameOver();
  }

  // Check if the snake eats the apple
  if (snakeX === appleX && snakeY === appleY) {
    score++;
    appleX = Math.floor(Math.random() * 40) * 10;
    appleY = Math.floor(Math.random() * 40) * 10;
    snakeLength++;
  }

  // Update the snake body
  snakeBody.push({ x: snakeX, y: snakeY });
  if (snakeBody.length > snakeLength) {
    snakeBody.shift();
  }
}

// Function to check collision with itself
function checkCollision() {
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
      return true;
    }
  }
  return false;
}

// Game over function
function gameOver() {
  alert('Game Over! Your score is ' + score);
  restartGame();
}

// Restart game function
function restartGame() {
  snakeX = 200;
  snakeY = 200;
  snakeSpeedX = 10;
  snakeSpeedY = 0;
  snakeBody = [];
  snakeLength = 5;
  appleX = Math.floor(Math.random() * 40) * 10;
  appleY = Math.floor(Math.random() * 40) * 10;
  score = 0;
}

// Add event listeners for key presses
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && snakeSpeedY !== 10) {
    snakeSpeedX = 0;
    snakeSpeedY = -10;
  } else if (e.key === 'ArrowDown' && snakeSpeedY !== -10) {
    snakeSpeedX = 0;
    snakeSpeedY = 10;
  } else if (e.key === 'ArrowLeft' && snakeSpeedX !== 10) {
    snakeSpeedX = -10;
    snakeSpeedY = 0;
  } else if (e.key === 'ArrowRight' && snakeSpeedX !== -10) {
    snakeSpeedX = 10;
    snakeSpeedY = 0;
  }
});

// Main game loop
setInterval(() => {
  drawBoard();
  drawSnake();
  drawApple();
  update();
}, 100);