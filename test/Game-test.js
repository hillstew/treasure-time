global.data = require('../dataset.js');
global.domUpdates = require('../domUpdates.js');
global.Player = require('../class/Player.js');
global.Puzzle = require('../class/Puzzle.js');
global.Wheel = require('../class/Wheel.js');
const chai = require('chai');
const expect = chai.expect;
const Game = require('../class/Game.js');
const spies = require('chai-spies');
chai.use(spies);
chai.spy.on(global.domUpdates, ['getPlayerNames'], () => ['first', 'second', 'third']);
chai.spy.on(global.domUpdates, ['hideStartScreen', 'displayPuzzle'], () => true);

describe('it should create a game ', function() {
  let game;

  beforeEach( function() {
    game = new Game();
  });

  afterEach(() => {
    chai.spy.restore(global.domUpdates);
  })

  it('it should start a game', function() {
    game.start();
    expect(domUpdates.getPlayerNames).to.have.been.called(1);
    expect(domUpdates.hideStartScreen).to.have.been.called(1);
    expect(game.currentWheel).to.have.property('elements').with.lengthOf(6);
    expect(game).to.have.property('players').with.lengthOf(3);
    expect(game).to.have.property('puzzles').with.lengthOf(4);
    expect(game.currentPuzzle).to.be.an.instanceOf(Puzzle);
    expect(domUpdates.displayPuzzle).to.have.been.called(1);
  });
  
  it('it should instanciate three players from Player class', function() {
    let playerNames = ['Hank', 'Dustin', 'Katiebelle'];
    game.createPlayers(playerNames);
    expect(game.players).to.have.lengthOf(3);
    expect(game.players[0, 1, 2]).to.be.an.instanceOf(Player);
    expect(game.players[0].name).to.equal('Hank');
    game.players.forEach(function(player) {
      expect(player).to.be.an('object').that.has.all.keys('name', 'currentScore', 'grandScore');
    });
  });

  it('should return an array of puzzles', function() {
    let bankOfPuzzles = game.createPuzzleBank();
    expect(bankOfPuzzles).to.be.instanceOf(Array);
    expect(bankOfPuzzles).to.have.lengthOf(96);
    bankOfPuzzles.forEach(function(puzzle) {
        expect(puzzle).to.be.an('object').that.has.all.keys('category', 'number_of_words', 'total_number_of_letters', 'first_word', 'description', 'correct_answer');
    });
  });

  it('should be able to generate a number given a max range', function() {
    let maxRange = 45;
    let num = game.createRandomNumber(maxRange);
    expect(num).to.be.within(0, maxRange);
  });

  it('should be able to return an array of 5 puzzles', function() {
    game.createPuzzles();
    expect(game.puzzles).to.have.lengthOf(5);
    game.puzzles.forEach(function(puzzle) {
        expect(puzzle).to.be.an('object').that.has.all.keys('category', 'number_of_words', 'total_number_of_letters', 'first_word', 'description', 'correct_answer');
    });
  });

  it('should create an instance of Wheel', function() {
    let wheel = game.createWheel();
    expect(wheel).to.be.instanceOf(Wheel);
  });
})