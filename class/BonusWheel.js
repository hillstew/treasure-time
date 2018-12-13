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

}

if (typeof module !== 'undefined') {
  module.exports = BonusWheel;
}