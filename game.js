var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];

var userChoosenPattern=[];

var started=false;
var level=0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function(){
  var userChoosenColor= $(this).attr("id");
  userChoosenPattern.push(userChoosenColor);

  playSound(userChoosenColor);

  animatePress(userChoosenColor);

  checkAnswer(userChoosenPattern.length-1);
});

function nextSequence()
{
   userChoosenPattern=[];
   level++;
   $("#level-title").text("Level " + level);

   var temp=Math.random();
   temp=temp*4;
   temp=Math.floor(temp);

   var randomChoosenColor = buttonColors[temp];

   gamePattern.push(randomChoosenColor);

   $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChoosenColor);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userChoosenPattern[currentLevel]) {


      if (userChoosenPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {


      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }
}




function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
 }, 100);

}


function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}
