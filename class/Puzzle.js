class Puzzle {
  constructor() { //puzzleObj
    this.answer = puzzleObj.correct_answer;
    this.category = puzzleObj.category;
    this.description = puzzleObj.description;
    this.numberOfWords = puzzleObj.number_of_words;
    this.totalLetters = puzzleObj.total_number_of_letters;
    this.lettersInFirst = puzzleObj.first_word
    // this.createPuzzle()
  }

  createPuzzle() {
    const randIndex = Math.floor(Math.random() * Math.floor(puzzleKeys.length));
    const typeOfPuzzle = puzzleKeys[randIndex];
    const puzzleArray = data.puzzles[typeOfPuzzle].puzzle_bank;
    
    const puzzleRandIndex = Math.floor(Math.random() * Math.floor(puzzleArray.length));
    const puzzleObj = puzzleArray[puzzleRandIndex];
    
  }
}

class BonusPuzzle extends Puzzle {
  constructor() {
    super();
    this.bonusPuzzle = bonusPuzzle;
  }
}