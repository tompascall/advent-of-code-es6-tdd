export default class Las {
  constructor ({input = '1'} = {}) {
    this.input = input;
  }

  iterate (string) {
    let charOnCount = '',
        amount = 0,
        chars = string.split(''),
        result = '';

    chars.forEach( (ch, index) => {
      if (ch !== charOnCount) {
        if (index !== 0) {
          result += amount + charOnCount;
        }
        charOnCount = ch;
        amount = 1;
      }
      else {
        amount++;
      }
      if (index === chars.length - 1) {
        result += amount + charOnCount;
      }  
    });
    return result;  
  }
  
  getLength (iterations) {
    let string = this.input;
    for (let i = 0; i < iterations; i++) {
      string = this.iterate(string);
    }
    return string.length;
  }
}
