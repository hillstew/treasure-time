global.data = require('../dataset.js');
global.domUpdates = require('../domUpdates.js');
global.Game = require('../class/Game.js');
global.Wheel = require('../class/Wheel.js');
const chai = require('chai');
const expect = chai.expect;
const BonusWheel = require('../class/BonusWheel.js');
const spies = require('chai-spies');
chai.use(spies);


describe('BonusWheel', function() {
  let bonusWheel;
  beforeEach( function() {
    bonusWheel = new BonusWheel();
    chai.spy.on(global.domUpdates, ['displaySpunElement', 'disableElement', 'displayBonusRoundInputs', 'displaySpunBonusElement'], () => true);
  })

  afterEach(() => {
    chai.spy.restore(global.domUpdates);
  })

  it('should have a multiplier property of 4 to increase element prizes by', function() {
    expect(bonusWheel.multiplier).to.equal(4)
  });

  it('should create bonus wheel elements', function() {
    bonusWheel.createWheelElements();
    expect(bonusWheel.elements).to.be.an('array').to.have.lengthOf(6)
    bonusWheel.elements.forEach(function(element) {
      expect(element).to.not.be.null; 
      expect(element).to.not.be.undefined;
    });
  });

  it('should return one element from current wheel elements', function() {
    bonusWheel.createWheelElements()
    bonusWheel.spin();
    expect(bonusWheel.currentElement).to.be.oneOf(bonusWheel.elements)
    expect(domUpdates.displaySpunBonusElement).to.have.been.called(1);
    expect(domUpdates.displayBonusRoundInputs).to.have.been.called(1);
    expect(domUpdates.disableElement).to.have.been.called(1);
  });
})