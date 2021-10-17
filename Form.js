class Form
{
    constructor()
    {
     this.name=null

    }

    screen1()
    {
      //adding first screen background.Related code in css also
     var bgImg = createImg("images/loadingscreen.jpg", "game title");
     bgImg.position(0,0);
     bgImg.class("bg")


     
      //MAke this name of the game
      var title=createElement("h2")
      title.html("It has been 3 weeks since the zombie virus has spread.Your goal is to escape the zombie apocalipse.Press the right and left arrow to move and press the left mouse button to shoot.There are 3 levels in this game.In the first level you have 6 lives.Your life decreases when a zombie touches your car.To progress to the second level you will need to obtain 25 points.The score increases when you kill a zombie.In the second level you will have 3 lives and will need 35 points to progress to thefinal level.In the final level you will have 1 life and will need 40 points to win the game.click the 'next'button to start the game.GOOD LUCK SURVIVOR.")
      title.position(100,150)
      var btn1=createButton("NEXT") 
      
      
      btn1.position(width-100,height-200) 
     

     

      btn1.mousePressed(()=>{
        title.hide()
        btn1.hide()
        bgImg.hide()
          gameState=PLAY;
       
      })
    }
}