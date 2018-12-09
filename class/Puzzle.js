class Puzzle {
  constructor(puzzleObj) {
    this.answer = (puzzleObj.correct_answer).toUpperCase();
    this.category = puzzleObj.category;
    this.description = puzzleObj.description;
    this.numberOfWords = puzzleObj.number_of_words;
    this.totalLetters = puzzleObj.total_number_of_letters;
    this.lettersInFirst = puzzleObj.first_word;
  }

  validateGuess(selectedLetter) {
    if (this.answer.toUpperCase().includes(selectedLetter)) {
      domUpdates.displayLetter(selectedLetter);
      return true;
    }
    return false;
  }
}


class BonusPuzzle extends Puzzle {
  constructor() {
    super();
    this.bonusPuzzle = bonusPuzzle;
  }
}


if (typeof module !== 'undefined') {
  module.exports = Puzzle;
}