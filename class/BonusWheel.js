class BonusWheel extends Wheel {
  constructor() {
    super();
    this.bonusElement = null;
  }

  awardBonusElement() {
  }
}

if (typeof module !== 'undefined') {
  module.exports = BonusWheel;
}