var zombieGroup; 
var bulletGroup; 
var zombie2Group;
var life=6;
var life2=3
var life3=1
var gun;
var bullet1; 
var score=0; 
var score2=0; 
var score3=0;
var PLAY = 1;
var END = 0;
var FORM=4
var gameState = FORM; 
var Secondlevel = 2; 
var Finallevel = 3; 






function preload(){ 
  carImg1=loadImage("images/car_img_2-removebg-preview.png"); 
  backgroundImg1=loadImage("images/level1 updated img.jpg"); 
  zombie1Img=loadImage("images/obstacle1.png"); 
  zombie2Img=loadImage("images/obstacle2.png"); 
  zombie3Img=loadImage("images/obstacle3.png"); 
  backgroundImg2=loadImage("images/level2 updated.png"); 
  backgroundImg3=loadImage("images/level3 updated.png"); 
  carImg2=loadImage("images/level 2 car.png");
  carImg3=loadImage("images/level 3 car.png"); 
  playbuttonImg=loadImage("images/play button.png"); 
  gunimg=loadImage("images/gunimage.png"); 
  bullet1=loadImage("images/bullet.png");
  bridgeImg=loadImage("images/bridge.png")
  gameOverImg=loadImage("images/gameoverimg.png") 
  loadingscreenimg=loadImage("images/loadingscreen.jpg"); 
  youwinimg=loadImage("images/you win.png");
}




function setup() {
  createCanvas(1530,700); 
  background1=createSprite(width/2,height/2,1000,700); 
  background1.addImage(backgroundImg1);  
  background1.scale=0.8; 
  background1.velocityX=-4; 

  

 car=createSprite(100,height-90,100,100);  
 car.addImage(carImg1); 
 car.scale=0.6; 
 car.setCollider("rectangle",0,0,340,195,0);


 
ground=createSprite(width/2,height-10,width,30);  
ground.shapeColor="black";
 
ground2=createSprite(1300,250,500,30); 
ground2.addImage(bridgeImg);
ground2.setCollider("rectangle",120,0,400,100); 


gun=createSprite(car.x-5,car.y-10,10,10); 
gun.addImage(gunimg); 
gun.scale=0.3;    


gameover=createSprite(width/2,height/2,10,10); 
gameover.addImage(gameOverImg); 
gameover.visible=false;

Youwin=createSprite(width/2,height/2,10,10);  
Youwin.addImage(youwinimg); 
Youwin.visible=false;

zombieGroup=new Group();  
bulletGroup=new Group(); 
zombie2Group=new Group();

form=new Form();
form.screen1()



}

function draw() {
  background("white"); 
  //movement of car- 

  gun.x=car.x-5;
  //background reset
  if (background1.x < 0){
    background1.x = background1.width/3;
  } 

  if(keyDown("RIGHT")&& car.x<width/2){ 
    car.x=car.x+5
  }
  
  if(keyDown("LEFT")&& car.x>110){ 
    car.x=car.x-5
  }
  
  obstacles();  
  bridgeZombie();
  zombie2Group.collide(ground2) 

 
  zombie2Group.setVelocityEach(-3,2)
  zombie2Group.collide(ground)
  
 

 


  
//zombie touching the player
      
         
  
if (gameState==PLAY)
{  
  zombieGroup.overlap(car,function(zo,ca){
    life=life-1
    zo.destroy()
       
   })
   zombieGroup.overlap(bulletGroup,function(zo,bu){
    score=score+1;
    zo.destroy();
    bu.destroy();
   // bulletGroup.destroyEach()
  })

  
 
   if(life==0)
   { 
     gameState=END;
   } 
   if(score === 25){ 
     gameState=Secondlevel;
   }
   
   //healthbar();
}

if(gameState === Secondlevel){ 
  
  background1.addImage(backgroundImg2); 
  background1.scale=4
    
   car.addImage(carImg2); 
   zombieGroup.overlap(car,function(zo,ca){
    life2=life2-1
    zo.destroy()
       
   })
   zombieGroup.overlap(bulletGroup,function(zo,bu){
    score2=score2+1;
    zo.destroy();
    bu.destroy();
   // bulletGroup.destroyEach()
  })

  
   
   if(life2==0)
   { 
     gameState=END;
   } 
   if(score2 === 35){ 
     gameState=Finallevel;
   }
   
  life=life2; 
  score=score2; 
  

 }
  if(gameState === END){ 
    car.destroy();
    zombieGroup.destroyEach(); 
    zombie2Group.destroyEach(); 
    bulletGroup.destroyEach();  
    gun.destroy(); 
    background1.velocityX=0; 
    gameover.visible=true; 
     
  
  } 

  if(gameState===Finallevel){
    background1.addImage(backgroundImg3); 
    car.addImage(carImg3); 
    car.y=height-65

    zombieGroup.overlap(car,function(zo,ca){
      life3=life3-1
      zo.destroy()
         
     })
     zombieGroup.overlap(bulletGroup,function(zo,bu){
      score3=score3+1;
      zo.destroy();
      bu.destroy();
     // bulletGroup.destroyEach()
    }); 

    if(life3==0){ 
      gameState=END;
    } 
    if(score3== 40){ 
      car.destroy();
    zombieGroup.destroyEach(); 
    zombie2Group.destroyEach(); 
    bulletGroup.destroyEach();  
    gun.destroy(); 
    background1.velocityX=0;
      Youwin.visible=true;
      console.log("you win");
    }
   
    life=life3; 
    score=score3;
  }

  drawSprites();
  healthbar(life)  
  textSize(15);
  text("SCORE="+score,100,30);  
    
}


function healthbar(life)
{
  if(gameState!==END)
  {
  
  push()
  
  fill ("white")
  rect (width/2,20,300,20);
  //text("SCORE",width/2,20)
  fill("#f50057");
  rect(width/2,20,life*50,20);
  pop()
  }
}

function mouseClicked(){ 
  bullet=createSprite(gun.x+120,car.y+10,10,10);     
  bullet.addImage(bullet1);  
  bullet.setCollider("rectangle",-80,-70,50,20)
  bullet.scale=0.5;
  bullet.velocityX=5;  
  bullet.lifetime=500;
   
  bulletGroup.add(bullet);
  //bullet.lifetime=100
}











function obstacles(){ 
  if(frameCount%50===0){  
    zombie1=createSprite(width,height-90,20,20); 
    zombie1.velocityX=-3;  
    zombie1.lifetime=500; 
    
    
    var rand=Math.round(random(1,2)); 
    switch(rand){ 
      case 1:  
      zombie1.addImage(zombie1Img);    
       
      zombie1.setCollider("rectangle",0,0,70,100)
           
      break;
      
      case 2:  
      zombie1.addImage(zombie3Img);     
      
      zombie1.setCollider("rectangle",50,0,70,100)
      break; 

      default: 
      break;
    }
    
    zombieGroup.add(zombie1); 
    zombieGroup.collide(ground); 
    zombieGroup.collide(ground2); 
    
  }
 
} 
function bridgeZombie()
{
  if(frameCount%200===0){  
    zombie2=createSprite(width,120,20,20); 
    zombie2.velocityX=-3;  
    zombie2.velocityY=5;
    zombie2.lifetime=500;
    zombie2.scale=0.8;
    //zombie2.collide(ground2)
    zombie2.addImage(zombie2Img); 
    
  
    zombie2Group.add(zombie2); 
    zombieGroup.add(zombie2);
    zombie2.setCollider("rectangle",0,0,70,150)
   

}
}






//remove debug. 
//comment the code. 
//change the form background. 
//add level 3. 
//make score 3. 
//make healthbar 3.

