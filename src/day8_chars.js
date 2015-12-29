export default class Chars {
  constructor (input) {
    this.rows = input.split('\n');
    this.countCode = this.countCodeGen();
    this.countCode.next();
    this.countMem = this.countMemGen();
    this.countMem.next();
    this.countInvert = this.countInvertGen();
    this.countInvert.next();
  }

  counter () {
    let count = {
      code: 0,
      mem: 0
    };
    for (let row of this.rows) {
      count.code = this.countCode.next(row).value;
      count.mem = this.countMem.next(row).value;
      count.invert = this.countInvert.next(row).value;
    }
    return count;
  }
  
  *countCodeGen () {
    let counter = 0;
    while (true) {
      let string = yield counter;
      counter += string.length;
    }
  }

  *countInvertGen () {
    let counter = 0;
    while (true) {
      let string = yield counter;
      counter += string.length + 2; // add the terminal "s
      for (let i = 0; i < string.length; i++) {
        if (string[i] === '"' || string[i] === '\\') {
          counter++;    
        }
      }
    }
  }

  *countMemGen () {
    let counter = 0;
    let backTest = 0;
    while (true) {
      let string = yield counter;
      for (let i = 0; i < string.length; i++) {
        if (i === 0 || i === string.length-1) continue; // jump over the first and last "
        if (string[i] === '\\') {
          let next = string[i + 1];
          if (next === '"' || next === '\\') {
            i++; // jump over '"' char and not to count
          }
          else if (next === 'x') {
            i += 3;
          }
        }
        counter++;
      }
    }
  }
}

