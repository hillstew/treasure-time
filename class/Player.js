class Player {
  constructor(name) {
    this.name = name;
    this.currentScore = 0;
    this.grandScore = 0;
  }

  updateScore() {
    this.currentScore++;
  }
}