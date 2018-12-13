global.data = require('../dataset.js');
global.domUpdates = require('../domUpdates.js');
global.Player = require('../class/Player.js');
global.Puzzle = require('../class/Puzzle.js');
global.BonusPuzzle = require('../class/BonusPuzzle.js');
global.Wheel = require('../class/Wheel.js');
global.BonusWheel = require('../class/BonusWheel.js');
const chai = require('chai');
const expect = chai.expect;
const Game = require('../class/Game.js');
const spies = require('chai-spies');
chai.use(spies);

describe('Game', function() {
  let game;

  beforeEach( function() {
    game = new Game();
    chai.spy.on(global.domUpdates, ['getPlayerNames'], () => ['first', 'second', 'third']);
    chai.spy.on(global.domUpdates, [
      'displayCurrentRound', 
      'displayGrandScore', 
      'displayRoundWinner', 
      'displayNotInPuzzle', 
      'displayPlayerNames', 
      'displayPuzzle', 
      'displaySpinInstructions', 
      'displaySpunElement', 
      'displayUpdatedScore', 
      'displayUserMessage', 
      'displayVowelError', 
      'displayVowelInstructions', 
      'enableElement', 
      'hideUserMessage', 
      'highlightCurrentUserCard', 
      'highlightVowels', 
      'hideStartScreen', 
      'removeClass', 
      'resetLetters', 
      'setupBonusRoundDisplay'
      'unhighlightPrevUserCard',
      ], () => true);
  });

  afterEach(() => {
    chai.spy.restore(global.domUpdates);
  })

  it('it should start a game', function() {
    game.start();
    expect(game.currentWheel).to.have.property('elements').with.lengthOf(6);
    expect(game).to.have.property('players').with.lengthOf(3);
    expect(game).to.have.property('puzzles').with.lengthOf(4);
    expect(game.currentPuzzle).to.be.an.instanceOf(Puzzle);
    expect(domUpdates.getPlayerNames).to.have.been.called(1);
    expect(domUpdates.hideStartScreen).to.have.been.called(1);
    expect(domUpdates.displayPlayerNames).to.have.been.called(1);
    expect(domUpdates.displayPuzzle).to.have.been.called(1);
    expect(domUpdates.displayCurrentRound).to.have.been.called(1);
    expect(domUpdates.displaySpinInstructions).to.have.been.called(1);
    expect(domUpdates.highlightCurrentUserCard).to.have.been.called(1);
  });
  
  it('it should instanciate three players from Player class', function() {
    let playerNames = ['Hank', 'Dustin', 'Katiebelle'];
    game.createPlayers(playerNames);
    expect(game.players).to.have.lengthOf(3);
    expect(game.players[0, 1, 2]).to.be.an.instanceOf(Player);
  });

  describe('createPuzzleBank', function() {
    it('should return an array of puzzles', function() {
      let bankOfPuzzles = game.createPuzzleBank();
      expect(bankOfPuzzles).to.be.instanceOf(Array);
      expect(bankOfPuzzles).to.have.lengthOf(96);
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
    game.createWheel();
    expect(game.currentWheel).to.be.instanceOf(Wheel);
    expect(game.currentWheel).to.have.property('elements').with.lengthOf(6);
  });

  it.skip('should intake a users guess', function() {
    let userGuess = 'C';
    game.intakeGuess(userGuess);
  });

  it.skip('should be able to change the player turn index', function() {
    game.changePlayerTurn();
  });

  it.skip('should check wheel element to see if bankrupt or lose-a-turn', function() {
    game.checkWheelElements();
  });

  it.skip('should check if a player can buy a vowel', function() {
    game.canPlayerBuyVowel();
  });

  it.skip('should let player buy a vowel', function() {
    game.letPlayerBuyVowel();
  });

  it.skip('should intake a users guessed phrase', function() {
    game.intakePhrase();
  });

  it.skip('should be able to create a new round', function() {
    game.createNewRound();
  });
})