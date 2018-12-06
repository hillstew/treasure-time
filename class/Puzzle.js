class Puzzle {
  constructor() {
    this.puzzle = null;
    this.answer = null;
    this.category = null;
    this.description = null;
  }

  createPuzzle() {
    const puzzleKeys = Object.keys(data.puzzles);
    const randIndex = Math.floor(Math.random() * Math.floor(puzzleKeys.length));
    const typeOfPuzzle = puzzleKeys[randIndex];
    const puzzleArray = data.puzzles[typeOfPuzzle].puzzle_bank;
    
    const puzzleRandIndex = Math.floor(Math.random() * Math.floor(puzzleArray.length));
    const puzzleObj = puzzleArray[puzzleRandIndex];
    
    this.answer = puzzleObj.correct_answer;
    this.description = puzzleObj.description;
    this.category = puzzleObj.category;
  }

}

class BonusPuzzle extends Puzzle {
  constructor() {
    super();
    this.bonusPuzzle = bonusPuzzle;
  }
}