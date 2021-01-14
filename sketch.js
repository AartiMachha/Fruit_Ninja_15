var swordImagefruit1,fruit2,fruit3,fruit4,virusImage;
var sword,enemy,fruits,virus,fruitGroup,EnemyGroup;
var score=0;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
 swordImage=loadImage('sword.png');
 fruit1=loadImage('fruit1.png');
 fruit2=loadImage('fruit2.png');
 fruit3=loadImage('fruit3.png');
 fruit4=loadImage('fruit4.png');
 virusImage=loadImage('alien1.png','alien2.png');
  gameoverImage=loadImage('gameover.png');
  
  sound=loadSound('knifeSwooshSound.mp3');
  sound1=loadSound('gameover.mp3');
}

function setup(){
 sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  sword.setCollider('rectangle',0,0,40,40);
  sword.debug=false;
 
  fruitGroup=createGroup();
  EnemyGroup=createGroup();
}


function draw(){
  background('lightblue');

  if(gameState===PLAY){
  fruits();
  Enemy();
    
    sword.x=World.mouseX;
    sword.y=World.mouseY;
  
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    sound.play();
    score=score+2;
  }else
  {
   if(EnemyGroup.isTouching(sword)){
     gameState = END;
     sound1.play();
     
      fruitGroup.destroyEach();
      EnemyGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      EnemyGroup.setVelocityXEach(0);
     
     sword.addImage(gameoverImage);
     sword.x=200;
     sword.y=200;
  }
  }
  }
   
  drawSprites();
  
  text("score: "+ score,300,30);
}

function fruits(){
  if(World.frameCount%80===0){
    position=Math.round(random(1,2))
    
    
    fruit=createSprite(400,200,20,20);
   
    fruit.scale=0.2;
    
    if(position==1){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==2){
        fruit.x=0;
        fruit.velocityX=(7+(score/4));
      }
    }
    
    fruit.scale=0.2;
    fruit.debug=false;
    
    
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    }else if(r==2){
      fruit.addImage(fruit2);
    }else if(r==3){
      fruit.addImage(fruit3);
    }else if(r==4){
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    virus=createSprite(400,200,20,20);
    virus.addAnimation('moving',virusImage);
    virus.y=Math.round(random(100,300));
    virus.velocityX=-(8+(score/10));
    virus.lifetime=50;
    
   EnemyGroup.add(virus);
  }
}
