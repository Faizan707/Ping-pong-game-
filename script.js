const gameBoard=document.getElementById("gameBoard")
const ctx =gameBoard.getContext("2d")
const score=document.querySelector(".score")
const resetBtn= document.getElementById("reset-button")
const gameWidth=gameBoard.width 
const gameHeight=gameBoard.height 
const boardBackground ="yellow"
const paddle1Color="lightblue"
const paddle2Color ="orange"
const paddleborder ="black"
const ballColor= "red"
const ballBorderColor ="black"
const ballRadius=12.5
const paddleSpeed=50
let intervalID;
let ballSpeed=1
let ballX=gameWidth/2 
let ballY= gameHeight/2 
let ballXdirection=0
let ballYdirection=0
let player1score =0
let player2score=0
let paddle1={
    width:25,
    height:100,
    x:0,
    y:0 
}
let paddle2={
    width:25,
    height:100,
    x:gameWidth-25,
    y:gameHeight-100  

}
window.addEventListener('keydown',changeDirection)
resetBtn.addEventListener('click',resetgame)
gameStart()

function gameStart(){
    createBall()
    nextTick()
}
function nextTick(){
    intervalID=setTimeout(()=>{
        clearBoard()
        drawPaddles()
        moveBall()
        drawBall(ballX,ballY)
        checkCollision()
        movePlayer2()        
        nextTick()


    },10)
}
let paddle2MoveDelay = 0; // Delay in milliseconds before next paddle movement

function movePlayer2() {
  paddle2MoveDelay -= 1; 

  if (paddle2MoveDelay <= 0) {
    // Set player2 paddle's position based on the ball's position
    if (ballY < paddle2.y + paddle2.height / 2) {
      paddle2.y -= paddleSpeed;
    } else if (ballY > paddle2.y + paddle2.height / 2) {
      paddle2.y += paddleSpeed;
    }
    // Adjust the paddle's position if it goes out of bounds
    if (paddle2.y < 0) {
      paddle2.y = 0;
    } else if (paddle2.y > gameHeight - paddle2.height) {
      paddle2.y = gameHeight - paddle2.height;
    }

    paddle2MoveDelay = 10; // Set the delay for the next paddle movement
  }
}

  
function clearBoard(){
    ctx.fillStyle=boardBackground
    ctx.fillRect(0,0,gameWidth,gameHeight)
}
function drawPaddles(){
    ctx.strokeStyle= paddleborder
    ctx.fillStyle = paddle1Color
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height)
    ctx.strokeRect( paddle1.x,paddle1.y,paddle1.width,paddle1.height)

    ctx.fillStyle = paddle2Color
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height)
    ctx.strokeRect( paddle2.x,paddle2.y,paddle2.width,paddle2.height)
    
    
}
function createBall(){
    ballSpeed=1
    if(Math.round(Math.round()==1)){
        ballXdirection=1
    }
    else{
        ballXdirection=-1
    }
    if(Math.round(Math.round()==1)){
        ballYdirection=1
    }
    else{
        ballYdirection=-1
    }
    ballX=gameWidth/2 
    ballY=gameHeight/2 
    drawBall(ballX,ballY)
}
function moveBall(){
    ballX+=(ballSpeed* ballXdirection)
    ballY+=(ballSpeed*ballYdirection)

}
function drawBall(ballX,ballY){
    ctx.fillStyle=ballColor
    ctx.strokeStyle=ballBorderColor
    ctx.lineWidth=2
    ctx.beginPath()
    ctx.arc(ballX,ballY,ballRadius,0,2*Math.PI)
    ctx.stroke()
    ctx.fill()

}
function checkCollision(){
    if(ballY<=0+ballRadius){
        ballYdirection*=-1

    }
    if(ballY>=gameHeight-ballRadius){
        ballYdirection*=-1
    }
    if(ballX<=0){
        player2score+=1
        updateScore()
        createBall()
        return
    }
    if(ballX>=gameWidth){
        player1score+=1
        updateScore();
        createBall();
        return
    }
    if(ballX<=(paddle1.x+paddle1.width+ballRadius)){
        if(ballY>paddle1.y&&ballY<paddle1.y+paddle1.height){
            ballX=(paddle1.x+paddle1.width)+ballRadius;//if the ball get stuck
            ballXdirection*=-1
            ballSpeed+=0.5
        }
    }
    if(ballX>=(paddle2.x-ballRadius)){
        if(ballY>paddle2.y&&ballY<paddle2.y+paddle2.height){
            ballX=paddle2.x-ballRadius;//if the ball get stuck
            ballXdirection*=-1
            ballSpeed+=0.5
            
        }
    }
}
function changeDirection(event){
    const keypressed=event.keyCode
    const paddle1Up=87
    const paddle1down=83
  

    switch(keypressed){
        case(paddle1Up):
        if(paddle1.y>0){
            paddle1.y-=paddleSpeed
        }
        break;
        case(paddle1down):
        if(paddle1.y<gameHeight-paddle1.height){
            paddle1.y+=paddleSpeed

        }
        break;
      
        

        
    }

}
function updateScore(){
    score.textContent=`${player1score}:${player2score}`   
}
function resetgame(){
    player1score=0
    player2score=0
    paddle1={
        width:25,
        height:100,
        x:0,
        y:0 
    }
    paddle2={
        width:25,
        height:100,
        x:gameWidth-25,
        y:gameHeight-100  
    
    }
    ballSpeed=1
    ballX=0
    ballY=0
    ballXdirection=0
    ballYdirection=0
    updateScore()
    gameStart()

}

let p = document.createElement("p")
p.innerHTML="Press W to move up player1 and S for move down"
document.body.appendChild(p)
p.style.color="purple"
p.style.textAlign="center"
p.style.fontSize="30px"
