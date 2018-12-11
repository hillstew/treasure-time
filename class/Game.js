class Game {
  constructor() {
    this.currentRound = 1;
    this.players = [];
    this.playersTurnIndex = 0;
    this.puzzles = [];
    this.currentPuzzle = null;
    this.currentWheel = null;
  }

  start() {
    const namesArray = domUpdates.getPlayerNames();
    domUpdates.hideStartScreen();
    domUpdates.displayPlayerNames(namesArray);
    this.createWheel();
    this.createPlayers(namesArray);
    this.createPuzzles();
    this.currentPuzzle = new Puzzle(this.puzzles.pop());
    domUpdates.displayPuzzle((Array.from(this.currentPuzzle.answer)), this.currentPuzzle.category);
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

  createRandomNumber(maxRange) {
    const randomIndex = Math.floor(Math.random() * Math.floor(maxRange));
    return randomIndex;
  }

  createPuzzles() {
    const puzzleBank = this.createPuzzleBank();
    for (let i = 1; i < 6; i++) {
      let index = this.createRandomNumber(puzzleBank.length);
      this.puzzles.push(...puzzleBank.splice(index, 1));
    }
  }
  
  createWheel() {
    this.currentWheel = new Wheel();
    this.currentWheel.createWheelElements();
  }

  intakeGuess(userGuess) {
    if (this.currentPuzzle.validateGuess(userGuess)) {
      this.players[this.playersTurnIndex].updateScore(this.currentWheel.currentElement);
    } else {
      this.changePlayerTurn();
    }
    domUpdates.enableElement('.js-spin-btn');
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
        domUpdates.hideUserMessage();
      }, 4000); 
      this.changePlayerTurn();
      domUpdates.displaySpinInstructions(this.players[this.playersTurnIndex].name);
    } else if (this.currentWheel.currentElement === 'LOSE A TURN') {
      domUpdates.displayUserMessage('LOSE A TURN');
      setTimeout(function() {
        domUpdates.hideUserMessage();
      }, 4000); 
      this.changePlayerTurn();
      domUpdates.displaySpinInstructions(this.players[this.playersTurnIndex].name); 
    } else {
      domUpdates.displaySpunElement(this.currentWheel.currentElement);
    }
  }


}



if (typeof module !== 'undefined') {
  module.exports = Game;
}