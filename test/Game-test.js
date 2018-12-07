const chai = require('chai');
const expect = chai.expect;
global.data = require('../dataset.js');
global.domUpdates = require('../domUpdates.js')
const Puzzle = require('../class/Puzzle.js');
const Wheel = require('../class/Wheel.js');
const Game = require('../class/Game.js');
const Player = require('../class/Player.js');
const spies = require('chai-spies');
chai.use(spies);
chai.spy.on(global.domUpdates, ['getPlayerNames'], () => ['first', 'second', 'third']);
chai.spy.on(global.domUpdates, ['hideStartScreen'], () => true);


describe('it should create a game ', function() {
  let game;
  beforeEach( function() {
    game = new Game();
  });

  afterEach(() => {
    chai.spy.restore();
  })

  it('it should start a game', function() {
    
    game.start()
    expect(domUpdates.getPlayerNames).to.have.been.called(1);
  });


})