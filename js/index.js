//sound files
var blueSound = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
var redSound = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
var orangeSound = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
var greenSound = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";

//set up variables
var playerActive = false;
var gameActive = false;
var setPattern = [];
var playerPattern = [];
var strict = false;
var turn = 1;
var x = 0; //very important for homemade timed loop, don't mess with it
var count = 0;

$(document).ready(function() {

  $("#start").click(function() {
    gameStart();
    $("#start").addClass("on");
  });
  $("#restart2").click(function() {
              window.location.reload(false);
            });
  $("#restart").click(function() {
    window.location.reload(false);
  });
  $("#strict").click(function() {
    if (gameActive === false) {
      if (strict === false) {
        strict = true;
        $("#strict").addClass("on");
      } else if (strict === true) {
        strict = false;
        $("#strict").removeClass("on");
      }
    }
  });

    $("#blue").click(function() {
      playSound(blueSound);
      $("#blue").addClass("effect");
      setTimeout(function() {
        $("#blue").removeClass("effect");
      }, 500);
      if (playerActive === true) {
      playerTurn(2);
      }
    });

    $("#red").click(function() {
      playSound(redSound);
      $("#red").addClass("effect");
      setTimeout(function() {
        $("#red").removeClass("effect");
      }, 500);
      if (playerActive === true) {
      playerTurn(0);
      }
    });

    $("#orange").click(function() {
      playSound(orangeSound);
      $("#orange").addClass("effect");
      setTimeout(function() {
        $("#orange").removeClass("effect");
      }, 500);
      if (playerActive === true) {
      playerTurn(3);
      }
    });

    $("#green").click(function() {
      playSound(greenSound);
      $("#green").addClass("effect");
      setTimeout(function() {
        $("#green").removeClass("effect");
      }, 500);
      if (playerActive === true) {
      playerTurn(1);
      }
    });
  }
);

//creates the pattern that the player is judged against
function createPattern() {
  for (var i = 0; i < 20; i++) {
    setPattern.push(Math.floor(Math.random() * 4));
  }
  
}

//homemade timed loop                   
function playPattern() {    
   setTimeout(function () {    
     if (setPattern[x] === 0) {
      
        playSound(redSound);
        $("#red").addClass("effect");
        setTimeout(function() {
          $("#red").removeClass("effect");
        }, 500);
      
    } else if (setPattern[x] === 1) {
     
        playSound(greenSound);
        $("#green").addClass("effect");
        setTimeout(function() {
          $("#green").removeClass("effect");
        }, 500);
      
    } else if (setPattern[x] === 2) {
      
        playSound(blueSound);
        $("#blue").addClass("effect");
        setTimeout(function() {
          $("#blue").removeClass("effect");
        }, 500);
      
    } else if (setPattern[x] === 3) {
      
        playSound(orangeSound);
        $("#orange").addClass("effect");
        setTimeout(function() {
          $("#orange").removeClass("effect");
        }, 500);
     }
      x++;                     
      if (x < turn) {           
         playPattern();             
      }                        
   }, 1500);
  
}

//initializes game after start button is pressed ##clear!!!
function gameStart() {
  setPattern = [];
  playerPattern = [];
  count = 0;
  $("#count").text(count);
  x = 0;
  turn = 1;
  gameActive = true;
  createPattern();
  playPattern();
  playerActive = true;
  
}

//player's turn to try to match the pattern
function playerTurn(index){
  playerPattern.push(index);
  
  
   if (_.last(playerPattern) !== setPattern[playerPattern.length - 1]) {
     
    setTimeout(function () {
     playSound("https://www.myinstants.com/media/sounds/windows-xp-error-sound.mp3");
     setTimeout(function () {
    if (strict === false) {
      x = 0;
      turn = 1;
      playerPattern = [];
      playPattern();
    } else if (strict === true) {
      gameStart();
    }}, 1000);
    }, 1000);
  } else if (playerPattern.length == _.first(setPattern, turn).length) {
  checkAgainst();
  }
  }
  


//verify that player's pattern is following setPattern
function checkAgainst(){
  if (turn > count){
  count ++;
    if (count == 20){
      youWon();
    }
  $("#count").text(count);
  }
  if (playerPattern.toString === _.first(setPattern, turn).toString) {
    turn ++;
    playerPattern = [];
    x = 0;
    playPattern();
  } else {
    setTimeout(function () {
    playSound("https://www.myinstants.com/media/sounds/windows-xp-error-sound.mp3");
      setTimeout(function () {
    if (strict === false) {
      x = 0;
      turn = 1;
      playerPattern = [];
      playPattern();
    } else if (strict === true) {
      gameStart();
    }}, 1000);
    }, 1000);
  }
}

//initializes sound effect functions
function playSound(url) {
  var audio = document.createElement('audio');
  audio.style.display = "none";
  audio.src = url;
  audio.autoplay = true;
  audio.onended = function() {
    audio.remove(); //Remove when played.
  };
  document.body.appendChild(audio);
}

function youWon(){
  $('#myModal').modal('show');
  
}