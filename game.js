var gamePattern = []
var userClickedPattern = []
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var level = 0;
var started = false

$(document).keypress(function(){
  if (!started) {
    nextSequence();
    started = true;
  }
})

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  level++;
  $('#level-title').text("Level " + level);
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100)
  playSound(randomChosenColour);
}

$('.btn').click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1)
})

function playSound(name){
  var audio = new Audio ('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentcolour){
  $('.' + currentcolour).addClass('pressed');
  setTimeout(function(){
    $('.' + currentcolour).removeClass('pressed');
  }, 100);
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("Right");

    if (userClickedPattern.length === gamePattern.length ) {

      setTimeout(function(){
        nextSequence()
      }, 1000);
    }

  } else {

      $('body').addClass('game-over');
      setTimeout(function(){
        $('body').removeClass('game-over');
      }, 200);

      $('#level-title').text("Game Over, Press Any Key to Restart");
      startOver();

  }
}
