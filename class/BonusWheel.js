class BonusWheel extends Wheel {
  constructor() {
    super();
    this.bonusElements = null;
  }

  awardBonusElement() {
  }
}

if (typeof module !== 'undefined') {
  module.exports = BonusWheel;
}