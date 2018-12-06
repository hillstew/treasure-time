class Game {
  constructor() {
    this.currentRound = 1;
    this.players = [];
    this.playersTurnIndex = 0;
  }

  start() {
    let namesArray = domUpdates.getPlayerNames();
    domUpdates.hideStartScreen();
    this.createPlayers(namesArray);
  }

  createPlayers(namesArray) {
    namesArray.forEach((name, i) => {
      let player = new Player(name);
      this.players.push(player);
    });
  }

}