var gamePattern=[];                                   // it strore the pattern of game 
var userClickedPattern=[];                            // it stores the user clicked patterm
var buttonColors=["red","blue","green","yellow"]     
var level=0;                                         //it indicates the level of the game 
var started=false;                                   //it tells if the game strted or not


function nextSequence (){                            //it will generate the sequence of the game
  
  userClickedPattern=[];

  level=level+1;

   var randomNumber=Math.floor(Math.random()*4);           
   var  randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
   
    //1.selecting the random colour to create the  game pattern

    $("#"+randomChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+randomChosenColour).removeClass("pressed");},50);
        playSound(randomChosenColour);

  $("h1").text("Level  "+level);       
}

$("body").keypress(function(){                              //function to start the game at keypress
  if(!started){
    nextSequence();
    started=true;
  }
})
 

// 2. creating a function to play sound in both click and nextSequence() function
function playSound(name){
     var audio1 = new Audio("sounds/" + name + ".mp3");
     audio1.play();
}

$(".btn").click(function(){                               //it will fill the user clicked buttons in userclicked pattern
   var userChosenColour = this.id;
   userClickedPattern.push(userChosenColour);

   $("#"+userChosenColour).addClass("pressed");

   setTimeout(function(){
     $("#"+userChosenColour).removeClass("pressed");},120);

   playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);   
  
})


function checkAnswer(currentLevel){                      //function to check either the game pattern and user clicked pattern is same or not 
 
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("true");

      if (gamePattern.length===userClickedPattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    
  }

  else{
    var audio2 = new Audio("sounds/wrong.mp3");
    audio2.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");},200);
    $("#level-title").text("Game Over Press Any Key to Restar");
      startOver();
      console.log("false");

  }
}

function startOver(){               //function to restart the game once it ends 
      gamePattern=[];
      level=0;
      started=false;
}
