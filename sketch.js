var START = 0
var PLAY = 1;
var END = 2;
var gameState = START;

var player,ground, invisibleEnemy, emeny,invisibleGround, coins, ladder;
var walkIMG, backgroundIMG, enemyIMG, coinsIMG, attackIMG, jumpIMG, dieIMG, nightIMG, ladderIMG, wallIMG;
var invisibleEnemyGroup, enemyGroup, ladderGroup, coinsGroup;
var score=0;

function preload(){
 backgroundIMG = loadImage("bg.jpg");
 enemyIMG = loadImage("enemy.png");
 coinsIMG= loadImage("coin.png");
 nightIMG= loadImage("night (1).png");
 ladderIMG= loadImage("ladder 2.png");
 wallIMG = loadImage("wall.jpg");
 attackIMG = loadAnimation("Attack (1).png", "Attack (2).png","Attack (3).png","Attack (4).png","Attack (5).png", "Attack (6).png","Attack (7).png","Attack (8).png","Attack (9).png", "Attack (10).png");
  
 jumpIMG = loadAnimation("Jump (1).png", "Jump (2).png","Jump (3).png","Jump (4).png","Jump (5).png", "Jump (6).png","Jump (7).png","Jump (8).png","Jump (9).png", "Jump (10).png");
  
 walkIMG = loadAnimation("Walk (1).png", "Walk (2).png", "Walk (3).png", "Walk (4).png", "Walk (5).png", "Walk (6).png", "Walk (7).png", "Walk (8).png", "Walk (9).png", "Walk (10).png" );
  
 dieIMG = loadAnimation("Dead (1).png","Dead (2).png","Dead (3).png","Dead (4).png","Dead (5).png","Dead (6).png","Dead (7).png","Dead (8).png","Dead (9).png","Dead (10).png");
}

function setup() {
  createCanvas(800,600)
  
  ground = createSprite(200,220,900,10);
  ground.addImage(backgroundIMG);
  ground.scale =6
  ground.velocity.x = -2
  ground.x = ground.width/2;
  
  
  player= createSprite(100,490,40);
  player.addAnimation("walk",walkIMG);
  player.addAnimation("image",attackIMG);
  player.addAnimation("jump", jumpIMG);
  player.addAnimation("dead",dieIMG);
  player.scale=0.25;
  player.debug= false;
  player.setCollider("rectangle",0,0,player.width-350,player.height)
  
  invisibleGround = createSprite(600,490,4000,10);
  invisibleGround.visible = false;
  
 invisibleEnemyGroup = createGroup();
 enemyGroup = createGroup();
 coinsGroup = createGroup();
 ladderGroup = createGroup();
  
  

}

function draw() {
  background(wallIMG);
  
  if(gameState === START){
    fill("red")
    textSize(20)
    text("Press the S to start to game.", 280,100);
    text("Press the down arrow key to make the player walk.",230,200)
    text("Escape all the obstacles to win the game",250,150)
    
    
    if(keyDown("S") && gameState === START){
      gameState = PLAY;
    }
  }
  
  else if(gameState === PLAY){
     
    if(ground.x<0){
    ground.x = ground.width/2;
  }
    console.log(player.y);
    if(keyDown("SPACE")&& player.y>391){
    player.velocityY= -20;
    player.changeAnimation("jump", jumpIMG);
  }
 player.velocityY = player.velocityY + 0.8;
 player.collide(invisibleGround);

    
    if(keyDown("DOWN_ARROW")){
      player.changeAnimation("walk", walkIMG);
    }
    
    if(enemyGroup.isTouching(player)){
    enemyGroup.destroyEach();
      //player.changeAnimation("image", attackIMG);
  }
    
    if(keyDown("UP_ARROW")){
      player.changeAnimation("image",attackIMG);
    }
    
    if(ladderGroup.isTouching(player)){
      ground.addImage(nightIMG);
    }
    
    if(invisibleEnemyGroup.isTouching(player)){
      invisibleEnemyGroup.destroyEach();
      player.scale = 0.15;
      score = score-5;
    }
     if(score===-5){  
       player.changeAnimation("dead",dieIMG);
      gameState= END;
     }
  
    
    
    
    if(coinsGroup.isTouching(player)){
      coinsGroup.destroyEach();
      player.scale = 0.35;
      score = score+10;
    } 
  //spawnobstacles();
   spawnenemy();
  spawncoins();
  spawnladder();
     drawSprites();
  
  }

  else if(gameState === END){
 
    player.collide(invisibleGround);
    
    coinsGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    player.velocityY = 0;
   drawSprites();
    
    push();
    fill(255);
    textSize(40);
    text("GAME OVER", width/2-50,height/2);
    pop();
  }
  
  

  fill(0);
  textSize(18)
  text("SCORE: "+ score,600,50);
}

/*function spawnobstacles(){
  if(World.frameCount%300===0){
   obstacle = createSprite(2100,450);
   obstacle.addImage(obstacleIMG);
   obstacle.scale = 0.5;
   obstacle.velocityX =-4;
   obstacle.lifetime = 525;
   obstacleGroup.add(obstacle);
  } 
}*/

function spawnenemy(){
  if(World.frameCount%170===0){
  enemy = createSprite(800,420);
    enemy.debug = false;
  enemy.addImage(enemyIMG);
  enemy.scale =0.25;
  enemy.velocityX = -4;
  enemy.lifetime = 200;
  enemyGroup.add(enemy);
    
  invisibleEnemy= createSprite(enemy.x+20,enemy.y);
  invisibleEnemy.debug = true;
  invisibleEnemy.visible =false;
   invisibleEnemy.scale = 0.5;
   invisibleEnemy.velocityX =-4;
   invisibleEnemy.lifetime = 200;
  invisibleEnemyGroup.add(invisibleEnemy);
  }
}

function spawncoins(){
  if(World.frameCount%300===0){
  coins = createSprite(800,450);
  coins.addImage(coinsIMG);
  coins.scale =0.5;
  coins.velocityX = -4;
  coins.lifetime = 200;
  coinsGroup.add(coins);
  }
}

function spawnladder(){
  if(World.frameCount===1000){
    ladder = createSprite(800,450);
    ladder.addImage(ladderIMG);
    ladder.velocityX =-4;
    ladder.scale= 1;
    ladderGroup.add(ladder);
    ladder.debug = false;
    ladder.setCollider("rectangle", 0,0,ladder.width-350,ladder.height)
  }
}