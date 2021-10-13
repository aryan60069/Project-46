var mainCarImg, muddyRoadImg, brokenRoadImg, roadImg, sidePathImg;
var muddyRoadAccidentImg, brokenCar;
var diversionImg;
var gameOverImg, restartImg;
var bg;
var mainCar, muddyRoad, brokenRoad, sidePathLeft, sidePathRight;
var muddyRoadGroup, brokenRoadGroup;
var diversion;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, gameOver;
var gameOverSound;

function preload(){
   roadImg = loadImage("images/Road.jpe");
   mainCarImg = loadImage("images/Main Car.png");
   muddyRoadImg = loadImage("images/MuddyRoad.png");
   brokenRoadImg = loadImage("images/Broken Road.png");
   muddyRoadAccidentImg = loadImage("images/MuddyRoadAccident.png");
   brokenCar = loadImage("images/Broken Car.png");
   sidePathImg = loadImage("images/SidePath.png");
   diversionImg = loadImage("images/Diversion Ahead.png")
   gameOverImg = loadImage("images/GameOver.png");
   restartImg = loadImage("images/Restart.png");
   gameOverSound = loadSound("sound/GameOverSound.mpeg");
}

  function setup() {
  createCanvas(1000,570);
  bg = createSprite(500,900,400,400);
  bg.addImage("road",roadImg);
  bg.velocityY = 3;
  bg.scale = 0.8;

  sidePathLeft = createSprite(100,300, 400, 400);
  sidePathLeft.addImage("1", sidePathImg);
  sidePathLeft.velocityY = 3;
  sidePathLeft.scale = 0.7;

  sidePathRight = createSprite(900,300, 400, 400);
  sidePathRight.addImage("1", sidePathImg);
  sidePathRight.velocityY = 3;
  sidePathRight.scale = 0.7;

  mainCar = createSprite(200,480,400,400);
  mainCar.addImage("main",mainCarImg);
  mainCar.scale = 0.8;
  mainCar.setCollider("rectangle",0,0,100,240);

  gameOver = createSprite(530,170, 10, 10);
  gameOver.addImage("over", gameOverImg);
  gameOver.scale = 1.6
  //gameOver.depth = muddyRoadGroup.depth;
  //gameOver.depth = gameOver.depth+1;

  restart = createSprite(510, 300, 10,10);
  restart.addImage("restart", restartImg);
  restart.scale = 0.35
  //restart.depth = muddyRoadGroup.depth;
  //restart.depth = restart.depth+1;

  muddyRoadGroup = createGroup();
  brokenRoadGroup = createGroup();
}

function draw() {

  background("black");
  console.log(mouseX);

  if(gameState === PLAY){

    if(bg.y > 350){
      bg.y = height/2;
    }

    if(sidePathLeft.y > 350){
      sidePathLeft.y = height/2;
    }

    if(sidePathRight.y > 350){
      sidePathRight.y = height/2;
    }

    if(keyDown(LEFT_ARROW)){
      mainCar.x = mainCar.x - 5;
    }
  
    if(keyDown(RIGHT_ARROW)){
      mainCar.x = mainCar.x + 5;
    }

    mainCar.collide(sidePathLeft);
    mainCar.collide(sidePathRight);

    spawnMuddyRoad();
  spawnBrokenRoad(); 

  if(brokenRoadGroup.isTouching(mainCar)){
    mainCar.addImage("broke",brokenCar);
    mainCar.changeAnimation("broke",brokenCar);
    mainCar.scale = 0.6;
    gameOverSound.play();
    gameState = END;
  }

  if(muddyRoadGroup.isTouching(mainCar)){
    mainCar.addImage("mud",muddyRoadAccidentImg);
    mainCar.changeAnimation("mud",muddyRoadAccidentImg);
    mainCar.scale = 0.5;
    gameOverSound.play();
    gameState = END;
  }

  gameOver.visible = false;
  restart.visible = false;

  } else {

    gameOver.visible = true;
    restart.visible = true;
    diversion.destroy();
    muddyRoadGroup.destroyEach();
    brokenRoadGroup.destroyEach();

    bg.velocityY = 0;
    sidePathLeft.velocityY = 0;
    sidePathRight.velocityY = 0;
    muddyRoadGroup.setVelocityYEach(0);
    brokenRoadGroup.setVelocityYEach(0);

    if(mousePressedOver(restart)) {
      reset();
    }

  }

  drawSprites();
}

function spawnMuddyRoad(){
  if(frameCount % 200 === 0){
    muddyRoad = createSprite(Math.round(random(290, 710)),20,400,400);
  muddyRoad.addImage("muddy",muddyRoadImg);
  muddyRoad.velocityY = 3;
  muddyRoad.scale = 4;
  muddyRoad.setCollider("rectangle",0,0,25,30);
  mainCar.depth = muddyRoad.depth;
  mainCar.depth = mainCar.depth + 1;

  diversion = createSprite(muddyRoad.x, muddyRoad.y+100 + 20, 20,20);
  diversion.addImage("divert", diversionImg);
  diversion.velocityY = 3;
  diversion.scale = 0.1;
  mainCar.depth = diversion.depth;
  mainCar.depth = mainCar.depth + 1;

  muddyRoadGroup.add(muddyRoad);
}
}

function spawnBrokenRoad(){
  if(frameCount % 300 === 0){
  brokenRoad = createSprite(random(290, 710),20,400,400);
  brokenRoad.addImage("broken",brokenRoadImg);
  brokenRoad.velocityY = 3;
  brokenRoad.scale = 0.7;
  brokenRoad.setCollider("rectangle", 0,0,215,200);
  mainCar.depth = brokenRoad.depth;
  mainCar.depth = mainCar.depth + 1;

  diversion = createSprite(brokenRoad.x, brokenRoad.y+100 + 20, 20,20);
  diversion.addImage("divert", diversionImg);
  diversion.velocityY = 3;
  diversion.scale = 0.1;
  mainCar.depth = diversion.depth;
  mainCar.depth = mainCar.depth + 1;

  brokenRoadGroup.add(brokenRoad);
}
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  bg.velocityY = 3;
  sidePathLeft.velocityY = 3;
  sidePathRight.velocityY = 3;

  muddyRoadGroup.destroyEach();
  brokenRoadGroup.destroyEach();
  mainCar.changeAnimation("main",mainCarImg);
  mainCar.scale = 0.8;
}
