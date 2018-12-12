class BonusPuzzle extends Puzzle {
  constructor(puzzleObj) {
    super(puzzleObj);
    this.bonusPuzzle = bonusPuzzle;
  }
}


if (typeof module !== 'undefined') {
  module.exports = BonusPuzzle;
}