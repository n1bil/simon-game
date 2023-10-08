var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").on("click", function () {             
  var userChosenColour = $(this).attr("id");    
  userClickedPattern.push(userChosenColour);   
  checkAnswer(userClickedPattern.length - 1);   

  playSound(userChosenColour);
  animatePress(userChosenColour);
});

$(document).keydown(function () {               
  if (!started) {                             
    nextSequence();
    started = true;                             
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);                               
  var randomNumber = Math.floor(Math.random() * buttonColours.length);   
  var randomChosenColour = buttonColours[randomNumber];                   
  gamePattern.push(randomChosenColour);                                  

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    gameOverAnimate();
    userClickedPattern = [];
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function gameOverAnimate() {
  $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}















/*
function checkAnswer(currentLevel) {
  console.log(userClickedPattern + "       " + gamePattern)
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
    console.log("Success");
  } else {
    console.log("Wrong")  
    playSound("wrong");
    gameOverAnimate();
    userClickedPattern = [];
    startOver();
  }
}
*/

// $(document).ready(function () {
//   nextSequence();
// });
