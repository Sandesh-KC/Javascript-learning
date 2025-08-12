//getting score from localstorage and also setting default value
let score = JSON.parse(localStorage.getItem ('score')) || { wins: 0,
losses: 0,
ties: 0
};

//using eventlistener instead of onclick
document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock')
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper')
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors')
});
document.querySelector('.js-autoplay').addEventListener('click', () => {
  autoPlay()
});
document.querySelector('.js-game-reset').addEventListener('click', () => {
  resetConfirmation();
});

//feature to play using keys r,s, p and a keys
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    resetConfirmation();
  }
});

//calling function to display score
updateScoreElement ();

let result = '';

//function to compare computer move with user input
function playGame(playerMove) {
  const computerMove = pickCompMove();
if (playerMove === 'Scissors') {
  if (computerMove === 'Rock') {
    result = 'You loose.';
  } else if (computerMove === 'Paper') {
    result = 'You win.';
  } else if (computerMove === 'Scissors') {
    result = 'Tie.';
  }
}
else if (playerMove === 'Rock') {
  if (computerMove === 'Rock') {
    result = 'Tie.';
  } else if (computerMove === 'Paper') {
    result = 'You loose.';
  } else if (computerMove === 'Scissors') {
    result = 'You win.';
  }
}
else if (playerMove === 'Paper') {
  if (computerMove === 'Rock') {
    result = 'You win.';
  } else if (computerMove === 'Paper') {
    result = 'Tie.';
  } else if (computerMove === 'Scissors') {
    result = 'You loose.';
  }
}
if (result === 'You win.') {
  score.wins++;
}
else if(result === 'You loose.') {
  score.losses++;
}
else if (result === 'Tie.') {
  score.ties++;
}

// this is for local storage
localStorage.setItem ('score', JSON.stringify(score));

// calling function to display score
updateScoreElement ();

//this is to display results in other <p>
document.querySelector('.js-result').innerHTML =  result;
document.querySelector('.js-move').innerHTML = ` You <img src="Assets/${playerMove}.png" class="game-move">
<img src="Assets/${computerMove}.png" class="game-move">Comp`;
}

//function to display score in <p>
function updateScoreElement () {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

//function to determine pick of computer
function pickCompMove () {
const randomNumber = Math.random();
let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1 / 3) {
  computerMove = 'Rock';
} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
  computerMove = 'Paper';
} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
  computerMove = 'Scissors';
}
return computerMove;
}

//reset score function
function resetScore () {
  score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement ();
}

//autoplay
let autoPlaying = false;
let intervalId;
function autoPlay () {
  if (!autoPlaying) {
    document.querySelector('.js-autoplay').innerHTML = 'Stop autoplaying';
    intervalId = setInterval(() => {
      const playerMove = pickCompMove();
      playGame(playerMove);
    }, 1000);
    autoPlaying = true;
  } else {
    document.querySelector('.js-autoplay').innerHTML = 'Autoplay';
    clearInterval(intervalId);
    intervalId = false;
    autoPlaying = false;
  }
}

//reset confirmation
function resetConfirmation () {
  document.querySelector('.js-reset-confirmation').innerHTML = `Are you sure you want to reset the score? 
  <button class="js-yes">Yes</button>
  <button class="js-no">No</button>`

  document.querySelector('.js-yes').addEventListener('click', () => {
    resetScore();
    resetHide();
  });
  document.querySelector('.js-no').addEventListener('click', () => resetHide());
}

function resetHide () {
  document.querySelector('.js-reset-confirmation').innerHTML = '';
}