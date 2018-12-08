class Player {
  constructor(name) {
    this.name = name;
    this.currentScore = 0;
    this.grandScore = 0;
  }

  updateScore(elementValue) {
    this.currentScore += elementValue;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Player;
}