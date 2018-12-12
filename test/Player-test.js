global.data = require('../dataset.js');
global.domUpdates = require('../domUpdates.js');
global.Game = require('../class/Game.js');
const Player = require('../class/Player.js');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

describe('it should create a players', function() {
  let player;
  let name = 'Hank';

  beforeEach( function() {
    chai.spy.on(global.domUpdates, ['displayUpdatedScore'], () => true);
    player = new Player(name);
  });

  afterEach(() => {
    chai.spy.restore(global.domUpdates);
  })

  it('should have a name', function() {
    expect(player.name).to.equal('Hank');
  });

  it.skip('should update its current score', function() {
    let score = 500;
    player.updateScore(score);
    expect(player.currentScore).to.equal(500);
  });
})
