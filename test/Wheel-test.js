global.data = require('../dataset.js');
global.domUpdates = require('../domUpdates.js');
global.Game = require('../class/Game.js');
const chai = require('chai');
const expect = chai.expect;
const Wheel = require('../class/Wheel.js');
const spies = require('chai-spies');
chai.use(spies);


describe('it should create a wheel', function() {
  let wheel;
  beforeEach( function() {
    wheel = new Wheel();
    chai.spy.on(global.domUpdates, ['displaySpunElement', 'disableElement'], () => true);
  })

  afterEach(() => {
    chai.spy.restore(global.domUpdates);
  })

  it('should create wheel elements', function() {
    wheel.createWheelElements();
    expect(wheel.elements).to.be.an('array').to.have.lengthOf(6);
  });

  it('should be able to generate a number given a max range', function() {
    let maxRange = 45;
    let num = wheel.createRandomNumber(maxRange);
    expect(num).to.be.within(0, maxRange);
  });

  it('should return one element from current wheel elements', function() {
    wheel.createWheelElements()
    wheel.spin();
    expect(wheel.currentElement).to.be.oneOf(wheel.elements)
    expect(domUpdates.displaySpunElement).to.have.been.called(1);
    expect(domUpdates.disableElement).to.have.been.called(1);
    
  });
})