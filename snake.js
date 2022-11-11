//board 
var blockSize = 25
var rows =20
var cols =20
var board
var context

let eat = new Audio('food.wav')
let over = new Audio('over.wav')
let music =  new Audio('music.wav')
let music2 = new Audio('game1.mp3')

//snake head
var snakeX = blockSize * 5
var snakeY = blockSize * 5

var snakeBody = []

//food
var foodX 
var foodY  
let velocityX = 0
let velocityY = 0
let currTime

var gameOver = false;


window.onload = () =>{
    board = document.getElementById('board')
    if (document.body.offsetWidth <= 1400){
        rows = 15 
    cols = 14 
    const up = document.createElement('button')
    const left = document.createElement('button')
    const right = document.createElement('button')
    const down = document.createElement('button')
    
    
    
    up.classList.add('up')
    down.classList.add('down')
    left.classList.add('left')
    right.classList.add('right')
    const div = document.getElementById('arcade')
    arcade.append(up,left,right,down)
    up.addEventListener('click',changeDirection)
    down.addEventListener('click',changeDirection)
    left.addEventListener('click',changeDirection)
    right.addEventListener('click',changeDirection)
    var audiosWeWantToUnlock = []
       audiosWeWantToUnlock.push(new Audio('music.wav'))
    document.body.addEventListener('touchstart', function() {
        if(audiosWeWantToUnlock) {
         for(let audio of audiosWeWantToUnlock) {
          audio.play()
         
         }
         audiosWeWantToUnlock = null
       }
       })
       //where earlier you did:
       
       
    }
    board.height = rows * blockSize
    board.width = cols * blockSize

    context = board.getContext('2d')
    

    placeFood()
    document.addEventListener('keyup',changeDirection)
    setInterval(update,100)
}

function update(){
    if(gameOver){
        return;
    }

    context.fillStyle ='black'
    context.fillRect(0,0,board.width,board.height)
    context.fillStyle = 'red'
    context.fillRect(foodX,foodY,blockSize,blockSize)

    if (snakeX == foodX && snakeY == foodY){
        eat.play()
        eat.volume = 0.4
        snakeBody.push([foodX,foodY])
        placeFood()
    }


    for(let i = snakeBody.length -1;i > 0;i--){
        snakeBody[i] = snakeBody[i-1]
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY]
    }

    context.fillStyle = 'lime'
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    if(snakeX > rows * blockSize){
        snakeX = 0 
    }else if(snakeX < 0){
        snakeX = cols * blockSize
    }else if(snakeY > cols * blockSize){
        snakeY = 0
    }else if(snakeY < 0){
        snakeY = rows * blockSize
    }
    context.fillRect(snakeX,snakeY,blockSize,blockSize)
    for (let i =0; i < snakeBody.length;i++) {
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize)
        
    }
    //game over
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            over.play()
            music2.play()
            music2.volume = 0.5
            const div = document.createElement('div')
            div.classList.add('popup')
             document.querySelector('h1').insertAdjacentElement("beforebegin",div)
             const btn = document.createElement('button')
             btn.innerHTML = 'restart'
            btn.classList.add('btn')
            const h3 = document.createElement('h3')
            h3.innerHTML = 'Game Over'
            div.appendChild(btn)
            div.insertAdjacentElement("afterbegin",h3)
            btn.addEventListener('click',()=>{
                location.reload()
            })
        }
    }
    
    
}


function changeDirection(e) {
    if ((e.code == 'ArrowUp' && velocityY != 1) || (e.target.classList.value == 'up' && velocityY != 1)){
        velocityX = 0;
        velocityY = -1;
    }
    else if ((e.code == 'ArrowDown' && velocityY != -1) || (e.target.classList.value == 'down' && velocityY != -1)){
        velocityX = 0;
        velocityY = 1;
    }
    else if ((e.code == 'ArrowLeft' && velocityX != 1) || (e.target.classList.value == 'left' && velocityX != 1)){
        velocityX = -1;
        velocityY = 0;
    }
    else if ((e.code == 'ArrowRight' && velocityX != -1) || (e.target.classList.value == 'right' && velocityX != -1)){
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}