class Player {
  constructor(name) {
    this.name = name;
    this.currentScore = 0;
    this.grandScore = 0;
  }

  updateScore(elementValue) {
    this.currentScore += elementValue;
    domUpdates.displayUpdatedScore(this.currentScore, this.name);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Player;
}