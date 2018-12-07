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
    this.currentWheel = this.createWheel();
    this.createPlayers(namesArray);
    this.createPuzzles();
    this.currentPuzzle = new Puzzle(this.puzzles.pop())
    domUpdates.displayPuzzle((Array.from(this.currentPuzzle.answer)), 
      this.currentPuzzle.category)
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
    const wheelElements = [];
    const wheelBank = data.wheel;
    for (let i = 1; i < 7; i++) {
      let index = this.createRandomNumber(wheelBank.length)
      wheelElements.push(...wheelBank.splice(index, 1))
    }
    return new Wheel(wheelElements);
  }
}


if (typeof module !== 'undefined') {
  module.exports = Game;
}