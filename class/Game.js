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
    } else if (this.playersTurnIndex < (this.players.length - 1)) {
      this.playersTurnIndex++;
    } else {
      this.playersTurnIndex = 0;
    }
    domUpdates.enableElement('.js-spin-btn');
  }
}


if (typeof module !== 'undefined') {
  module.exports = Game;
}