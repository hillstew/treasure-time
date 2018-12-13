class BonusWheel extends Wheel {
  constructor() {
    super();
    this.multiplier = 4;
  }

  createWheelElements() {
    const wheelBank = data.wheel.concat();
    const wheelBankToUse = wheelBank.filter(element => {
      return typeof element === 'number';
    });

    for (let i = 1; i < 7; i++) {
      let index = this.createRandomNumber(wheelBankToUse.length)
      this.elements.push(...wheelBankToUse.splice(index, 1));
    }

    this.elements = this.elements.map(element => {
      return (element * this.multiplier);
    });
  }

  spin() {
    let index = this.createRandomNumber(this.elements.length);
    this.currentElement = this.elements[index];
    domUpdates.displaySpunBonusElement(this.currentElement);
    domUpdates.displayBonusRoundInputs();
    domUpdates.disableElement('.js-spin-btn', '#b1b2b4');
  }

}

if (typeof module !== 'undefined') {
  module.exports = BonusWheel;
}