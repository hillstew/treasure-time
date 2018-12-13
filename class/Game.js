class Game {
  constructor() {
    this.currentRound = 1;
    this.players = [];
    this.playersTurnIndex = 0;
    this.puzzles = [];
    this.currentPuzzle = null;
    this.currentWheel = null;
    this.grandWinner = null;
  }

  start() {
    const namesArray = domUpdates.getPlayerNames();
    domUpdates.hideStartScreen();
    domUpdates.displayPlayerNames(namesArray);
    this.createWheel();
    this.createPlayers(namesArray);
    this.createPuzzles();
    this.currentPuzzle = new Puzzle(this.puzzles.pop());
    domUpdates.displayPuzzle(this.currentPuzzle.answer, this.currentPuzzle.category);
    domUpdates.displayCurrentRound(this.currentRound);
    domUpdates.displaySpinInstructions(this.players[this.playersTurnIndex].name);
    domUpdates.highlightCurrentUserCard(this.players[this.playersTurnIndex].name);
  }

  createPlayers(namesArray) {
    namesArray.forEach((name) => {
      let player = new Player(name);
      this.players.push(player);
    });
  }

  createPuzzleBank() {
    const puzzleKeys = Object.keys(data.puzzles);
    const puzzleBank = puzzleKeys.reduce((puzzleArray, puzzleKey) => {
      puzzleArray.push(...data.puzzles[puzzleKey].puzzle_bank)
      return puzzleArray;
    }, []);
    return puzzleBank;
  }

  createBonusPuzzle() {
    const puzzleBank = data.puzzles.one_word_answers.puzzle_bank.concat();
    const puzzleBankToUse = puzzleBank.filter(puzzle => {
      return puzzle.correct_answer.length > 6;
    });
    const randomIndex = this.createRandomNumber(puzzleBankToUse.length);
    let bonusPuzzle = new Puzzle(puzzleBankToUse[randomIndex]);
    this.currentPuzzle = bonusPuzzle;
  }

  createRandomNumber(maxRange) {
    const randomIndex = Math.floor(Math.random() * Math.floor(maxRange));
    return randomIndex;
  }

  createPuzzles() {
    const puzzleBank = this.createPuzzleBank();
    for (let i = 1; i < 5; i++) {
      let index = this.createRandomNumber(puzzleBank.length);
      this.puzzles.push(...puzzleBank.splice(index, 1));
    }
  }
  
  createWheel() {
    this.currentWheel = new Wheel();
    this.currentWheel.createWheelElements();
  }

  createBonusWheel() {
    this.currentWheel = new BonusWheel();
    this.currentWheel.createWheelElements();
  }

  intakeGuess(userGuess) {
    domUpdates.removeClass('.js-spin-btn', 'vowel-time');
    if (this.currentPuzzle.validateGuess(userGuess)) {
      this.players[this.playersTurnIndex].updateScore(this.currentWheel.currentElement);
    } else {
      
      if (this.currentPuzzle.isLetterAVowel(userGuess)) {
        this.players[this.playersTurnIndex].updateScore(this.currentWheel.currentElement);
      }
      domUpdates.displayNotInPuzzle();
      setTimeout(function() {
        domUpdates.hideUserMessage();
      }, 2000); 
      this.changePlayerTurn();
    }
    domUpdates.enableElement('.js-spin-btn');
    domUpdates.removeClass('.vowel', 'highlighted-vowel')
    domUpdates.removeClass('.consonant', 'temp-disable');
    domUpdates.displaySpinInstructions(this.players[this.playersTurnIndex].name);
  }

  changePlayerTurn() {
    domUpdates.unhighlightPrevUserCard(this.players[this.playersTurnIndex].name);
    if ((this.playersTurnIndex < (this.players.length - 1))) {
      this.playersTurnIndex++;
    } else {
      this.playersTurnIndex = 0;
    }
    domUpdates.highlightCurrentUserCard(this.players[this.playersTurnIndex].name);
  }

  checkWheelElement() {
    if (this.currentWheel.currentElement === 'BANKRUPT') {
      this.players[this.playersTurnIndex].currentScore = 0;
      domUpdates.displayUpdatedScore(this.players[this.playersTurnIndex].currentScore, this.players[this.playersTurnIndex].name);
      domUpdates.displayUserMessage('BANKRUPT');
      
      setTimeout(function() {
        domUpdates.hideUserMessage()
      }, 2000); 
      
      this.changePlayerTurn();
      domUpdates.displaySpinInstructions(this.players[this.playersTurnIndex].name);
      domUpdates.enableElement('.js-spin-btn');
    } else if (this.currentWheel.currentElement === 'LOSE A TURN') {
      domUpdates.displayUserMessage('LOSE A TURN');
      setTimeout(function() {
        domUpdates.hideUserMessage()
      }, 2000); 
      this.changePlayerTurn();
      domUpdates.displaySpinInstructions(this.players[this.playersTurnIndex].name); 
      domUpdates.enableElement('.js-spin-btn');
    } else {
      domUpdates.displaySpunElement(this.currentWheel.currentElement);
    }
  }

  canPlayerBuyVowel() {
    if (this.players[this.playersTurnIndex].currentScore >= 100) {
      this.letPlayerBuyVowel();
    } else {
      domUpdates.displayVowelError();
      setTimeout(function() {
        domUpdates.hideUserMessage()
        domUpdates.removeClass('.js-letters', 'temp-disable');
      }, 2000); 
      domUpdates.enableElement('.js-spin-btn');

    }
  }

  letPlayerBuyVowel() {
    domUpdates.highlightVowels();
    domUpdates.displayVowelInstructions();
    this.currentWheel.currentElement = -100;
  } 

  intakePhrase(guess) {
    if (this.currentPuzzle.checkAnswer(guess)) {
      let winner = this.players[this.playersTurnIndex];
      winner.grandScore += winner.currentScore;
      domUpdates.displayGrandScore(winner.grandScore, winner.name);
      domUpdates.displayRoundWinner(winner.name, this.currentRound);
      setTimeout(() => {
        domUpdates.hideUserMessage()
        this.players.forEach((player) => {
          player.currentScore = 0;
        })
      this.createNewRound();
      domUpdates.resetLetters();
      }, 2000); 
    } else {
      this.changePlayerTurn();
      domUpdates.displaySpinInstructions(this.players[this.playersTurnIndex].name);
    }
  }

  createNewRound() {
    if (this.currentRound === 4) {
      this.currentRound++;
      this.determineWinner();
      domUpdates.emptyPuzzleSection();
      domUpdates.displayWinner(this.grandWinner.winner.name);
    } else {
      this.currentRound++
      this.createWheel();
      this.currentPuzzle = new Puzzle(this.puzzles.pop());
      this.players.forEach((player) => {
        domUpdates.displayUpdatedScore(player.currentScore, player.name);
      });
      domUpdates.displayPuzzle(this.currentPuzzle.answer, this.currentPuzzle.category);
      domUpdates.displayCurrentRound(this.currentRound);
      domUpdates.displaySpinInstructions(this.players[this.playersTurnIndex].name);
      domUpdates.highlightCurrentUserCard(this.players[this.playersTurnIndex].name);
    }
  }

  determineWinner() {
    let highest = 0;
    let gameWinner = this.players.reduce((obj, player) => {
      if (player.grandScore > highest) {
        highest = player.grandScore;
        obj.winner = player;
      }
      return obj;
    }, {});
    this.grandWinner = gameWinner;
  }

  startBonusRound() {
    this.createBonusPuzzle();
    domUpdates.unhighlightPrevUserCard(this.players[this.playersTurnIndex].name);
    domUpdates.highlightCurrentUserCard(this.grandWinner.winner.name);
    domUpdates.setupBonusRoundDisplay(this.currentPuzzle.answer, this.currentPuzzle.category);
    this.createBonusWheel();
  }

  intakeBonusInputs(lettersToCheck) {
    lettersToCheck.forEach((letter) => {
      this.currentPuzzle.validateGuess(letter.toUpperCase());
    });
  }

  intakeBonusPhrase(guess) {
    if (this.currentPuzzle.checkAnswer(guess)) {
      let winner = this.players[this.playersTurnIndex];
      winner.grandScore += this.currentWheel.currentElement;
      domUpdates.displayGrandScore(winner.grandScore, winner.name);
      $('.js-user-instructions').empty().append(`<h2>Congratulations ${winner.name}! You guessed correctly and now you can take home your treasure chest of $${winner.grandScore}</h2>`)
    } else {
      let winner = this.players[this.playersTurnIndex];
      $('.js-user-instructions').empty().append(`<h2>Sorry ${winner.name}, you guessed incorrectly. However you still get to go home with your treasure chest of $${winner.grandScore}</h2>`)
    }
  }

}



if (typeof module !== 'undefined') {
  module.exports = Game;
}