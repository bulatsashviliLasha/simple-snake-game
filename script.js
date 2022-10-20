const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
const audio = new Audio("apple-crunch.wav");
const gameOver = document.getElementById("game-over")

const squares = [];
let currentSnake = [2,1,0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.98;
let timerId = 0;

function createGrid(){
    for(let i = 0 ; i<width*width; i++){
        const square = document.createElement('div');
        grid.appendChild(square);
        square.classList.add('square');
        squares.push(square)
    }
}

createGrid();

currentSnake.forEach(el => squares[el].classList.add('snake'));

function startGame(){
    gameOver.classList.add('hidden')
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId)
    currentSnake = [2,1,0];
    direction = 1;
    score = 0;
    scoreDisplay.textContent = score;
    intervalTime = 1000;
    generateApple();
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move,intervalTime)
}

function move(){
    if(
        (currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ){
        gameOver.classList.remove('hidden')
        return clearInterval(timerId)
    }

    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0]+direction);

    if(squares[currentSnake[0]].classList.contains('apple')){
        audio.play()
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple();
        score++;
        clearInterval(timerId)
        scoreDisplay.innerHTML = score;
        intervalTime = intervalTime * speed;
        timerId = setInterval(move,intervalTime)
    }

    squares.forEach(item => item.classList.remove('head'))
    squares[currentSnake[0]].classList.add('snake','head');
}




function generateApple(){
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    }while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

generateApple()

function control(e) {
    if(e.key === 'ArrowRight'){
        console.log('Right pressed')
        direction = 1
    }else if(e.key === 'ArrowUp'){
        console.log('up pressed')
        direction = -width
    }else if(e.key === 'ArrowLeft'){
        console.log('left pressed')
        direction = -1
    }else if(e.key === 'ArrowDown'){
        direction = +width

    }
}

document.addEventListener("keydown",control);
startButton.addEventListener("click", startGame)