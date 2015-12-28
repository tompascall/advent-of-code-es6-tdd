let WIDTH = 1000,
    HEIGHT = 1000;

export class SimpleLights {
  
  constructor ({columns = WIDTH, rows = HEIGHT, initValue = 0} = {}) {
    this.table = [];
    this.value = 0;
    this.toggle = false;
    for (let col = 0; col <= columns; col++) {
      this.table[col] = [];
      for (let row = 0; row <= rows; row++) {
        this.table[col][row] = initValue;
      }
    }
  }

  setLight(x, y, value) {
    this.table[x][y] = value;
  }

  getLight(x, y) {
    return this.table[x][y];
  }

  setRange({x1, y1, x2, y2, value, toggle} = {}) {
    for (let col = x1; col <= x2; col++) {
      for (let row = y1; row <= y2; row++) {
        if (toggle) {
          this.table[col][row] = Number(!this.table[col][row]);  
        }
        else {
          this.table[col][row] = value;
        }
      }
    }
  }

  getInstruction(row) {
    let reg = /(turn on|turn off|toggle)\s(\d+),(\d+)\sthrough\s(\d+),(\d+)/;
    let instruction = row.match(reg);
    if (instruction) {
      instruction.shift();
      instruction = instruction.map( (token) => {
        if (!isNaN(token)) {
          return Number(token);
        }
        else return token;
      });
    }
    return instruction;
  }
  
  *getPartsOfInstructions(input) {
    let rows = input.split('\n');
    for (let row of rows) {
      let instruction = this.getInstruction(row),
      action = instruction[0],
      x1 = instruction[1],
      y1 = instruction[2],
      x2 = instruction[3],
      y2 = instruction[4];
      
      yield {action, x1, y1, x2, y2};
    }
  }
  
  setToggleAndValue (action) {
    switch (action) {
      case 'toggle':
        this.toggle = true;
        break;
      case 'turn on':
        this.value = 1;
        this.toggle = false;
        break;
      case 'turn off':
        this.value = 0;
        this.toggle = false;
        break;
      default:
        throw new Error('Unknown action:', action);
    }
  }
  
  process (input) {
    let partsOfInstructions = this.getPartsOfInstructions(input);

    for (let instructionsInRow of partsOfInstructions) {
      this.setToggleAndValue(instructionsInRow.action);
      this.setRange({
        x1: instructionsInRow.x1, 
        y1: instructionsInRow.y1, 
        x2: instructionsInRow.x2, 
        y2: instructionsInRow.y2,
        value: this.value,
        toggle: this.toggle 
      });
    }
  }

  count() {
    let width = this.table.length,
        height = this.table[0].length,
        counter = 0;

    for (let col = 0; col < width; col++) {
      for (let row = 0; row < height; row++) {
        counter = this.countSimple({ col, row, counter });
      }
    }

    return counter;
  }

  countSimple ({ col, row, counter } = {}) {
    if (this.getLight(col, row)) {
      return counter + this.getLight(col, row);
    }
    else return counter;
  }

}

export class TrickyLights extends SimpleLights {
  constructor ({ columns = WIDTH, rows = HEIGHT, initValue = 0 } = {}) {
    super ({ columns, rows, initValue }); 
  }

  setRange({x1, y1, x2, y2, toggle, value} = {}) {
    for (let col = x1; col <= x2; col++) {
      for (let row = y1; row <= y2; row++) {
        if (toggle) {
          this.table[col][row] += 2;  
        }
        else {
          this.table[col][row] += value;
          this.table[col][row] = (this.table[col][row] <= 0) ? 0 : this.table[col][row];
        }
      }
    }
  }

  setToggleAndValue (action) {
    switch (action) {
      case 'toggle':
        this.toggle = true;
        break;
      case 'turn on':
        this.value = 1;
        this.toggle = false;
        break;
      case 'turn off':
        this.value = -1;
        this.toggle = false;
        break;
      default:
        throw new Error('Unknown action:', action);
    }
  }
}

