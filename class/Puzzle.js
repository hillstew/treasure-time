class Puzzle {
  constructor(puzzleObj) {
    this.answer = puzzleObj.correct_answer;
    this.category = puzzleObj.category;
    this.description = puzzleObj.description;
    this.numberOfWords = puzzleObj.number_of_words;
    this.totalLetters = puzzleObj.total_number_of_letters;
    this.lettersInFirst = puzzleObj.first_word
  }
}

class BonusPuzzle extends Puzzle {
  constructor() {
    super();
    this.bonusPuzzle = bonusPuzzle;
  }
}