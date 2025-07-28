//getting score from localstorage and also setting default value
      let score = JSON.parse(localStorage.getItem ('score')) || { wins: 0,
      losses: 0,
      ties: 0
      };

      //calling function to display score
      updateScoreElement ();

      /*
      if(!score) {
        score = {
          wins: 0,
          losses: 0,
          ties:0
        };
      }
      */  

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