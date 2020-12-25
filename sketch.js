//creating global variables
var monkey, monkeyImg;
var banana, bananaImg, bananaGroup;
var obstacles, obstaclesImg, obstaclesGroup;
var back,backImg;
var ground;
var score = 0;
var time = 0;
var lives = 5;
var gameState = "on"

function preload(){
monkeyImg = loadAnimation("image/Monkey_01.png", "image/Monkey_02.png","image/Monkey_03.png", 
"image/Monkey_04.png", "image/Monkey_05.png","image/Monkey_06.png","image/Monkey_07.png","image/Monkey_08.png",
"image/Monkey_09.png",  "image/Monkey_10.png");
backImg = loadImage("image/jungle.jpg");
bananaImg = loadImage("image/banana.png")
obstaclesImg = loadImage("image/stone.png");
}
function setup(){
  createCanvas(displayWidth, displayHeight);
  ground = createSprite(displayWidth/2, 570, displayWidth, 5);
  ground.visible = false
  monkey = createSprite(60, 500);
  monkey.addAnimation("running",monkeyImg);
  monkey.velocityX = 10
  monkey.scale = 0.2;
  obstaclesGroup= createGroup();
  bananaGroup= createGroup();
  obstacles = createSprite(600, 520);
  obstacles.addImage(obstaclesImg);
  obstacles.scale = 0.3;
  obstacles.velocityX = -10;
}

function draw(){
  camera.position.x = monkey.x
  if(ground.x < camera.position.x){
    ground = createSprite(camera.position.x/2, 570, camera.position.x, 5);
  }
  background(backImg);
  time = time + (Math.round(frameRate())/100)
  if(ground.x<(camera.position.x - 1)){
    ground.x = camera.position.x/2;
  }
  if(gameState !== "off"){

  
  if (touches.length>0||keyDown("space")&& monkey.y >=300) {
    monkey.velocityY = -10;
    touches = [];
  }
}
  monkey.velocityY +=0.8
  monkey.collide(ground);
  myBanana();
  barrier();
  if (bananaGroup.isTouching(monkey)) {                    
    bananaGroup.destroyEach();
    score += 2;
    switch(score){
      case 10: monkey.scale+= 0.02
      break;
      case 20: monkey.scale+=0.02;
      break;
      case 30: monkey.scale+=0.02;
      break;
      case 40: monkey.scale+=0.02;
      break;
      case 50: monkey.scale+=0.02;
      break;
      case 60: monkey.scale+=0.02;
      break;
      case 70: monkey.scale+=0.02;
      break;
      case 80: monkey.scale+=0.02;
      break;
      case 90: monkey.scale+=0.02;
      break;
      case 100: monkey.scale+=0.02;
      break;
      default: break;
    }
  }
   if(obstaclesGroup.isTouching(monkey)){
    obstaclesGroup.destroyEach();
    monkey.scale = 0.2;
    lives -= 1
    console.log(lives)

  }
  if(score === 10){
    lives ++
    score = 0
  }
  end()
  drawSprites();
  textSize(20);
  stroke("white");
  textSize(20);
  fill("white");
  if(gameState !== "off"){
    text("SCORE : "+ score, camera.position.x - 680, 20);
    text("TIME : "+time, camera.position.x  - 680, 50);
    text("LIFE : "+ lives, camera.position.x - 680, 80)
    text("PRESS SPACE TO MAKE THE MONKEY JUMP",camera.position.x - 680, 110 )
    text("AFTER THE SCORE REACHES 10, THE ", camera.position.x - 680, 140)
    text("SCORE WILL BECOME 0 AND ONE LIFE WILL BE ADDED", camera.position.x - 680, 180)

  
  }else{
    textSize(70)
    text("GAME ENDED", camera.position.x, 300)
  }
    ground.visible = false
  //camera.position.y = displayHeight
}
function myBanana(){
 if(gameState !== "off"){
  if(frameCount%70===0){
    banana = createSprite(camera.position.x + 1500 ,Math.round(random(200, 400)))
    banana.addImage(bananaImg);
    banana.velocityX = 0;
    banana.scale= 0.1;
    banana.lifetime = 900;
    bananaGroup.add(banana);
  }
 }
  
}
function barrier() {
  if(gameState !== "off"){
    if(frameCount%100===0){
      obstacles = createSprite(camera.position.x + 1500, 530);
      obstacles.addImage(obstaclesImg);
      obstacles.scale = 0.3;
      obstacles.velocityX = 0;
      obstacles.lifetime = 900;
      obstaclesGroup.add(obstacles);
    }
  }
  
}
function end(){
 if(lives < 0){
   monkey.remove()
   gameState = "off"
   console.log("working")
 } else {
   barrier()
   myBanana()
 }
}