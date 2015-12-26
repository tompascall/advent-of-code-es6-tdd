let lights = {},
    WIDTH = 1000,
    HEIGHT = 1000,
    table = [];

lights.initTable = function ({columns = WIDTH, rows = HEIGHT, initValue = 0} = {}) {
  table = new Array(columns).fill(new Array(rows).fill(initValue));
  for (let col = 0; col <= columns; col++) {
    table[col] = [];
    for (let row = 0; row <= rows; row++) {
      table[col][row] = initValue;
    }
  }
};

lights.setLight = function (x, y, value) {
  table[x][y] = value;
}

lights.getLight = function (x, y) {
  return table[x][y];
}

lights.setRange = function ({x1, y1, x2, y2, value, toggle} = {}) {
  for (let col = x1; col <= x2; col++) {
    for (let row = y1; row <= y2; row++) {
      if (toggle) {
        table[col][row] = !table[col][row];  
      }
      else {
        table[col][row] = value;
      }
    }
  }
};

lights.getInstruction = function (row) {
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
};

lights.process = function (input) {
  let rows = input.split('\n');
  for (let row of rows) {
    let instruction = lights.getInstruction(row),
    action = instruction[0],
    x1 = instruction[1],
    y1 = instruction[2],
    x2 = instruction[3],
    y2 = instruction[4],
    toggle,
    value;
    
    switch (action) {
      case 'toggle':
        toggle = true;
        break;
      case 'turn on':
        value = true;
        break;
      case 'turn off':
        value = false;
        break;
      default:
        throw new Error('Unknown action:', action);
    }

    lights.setRange({x1, y1, x2, y2, value, toggle});
  }
};

lights.count = function () {
  let width = table.length,
      height = table[0].length,
      counter = 0;

  for (let col = 0; col < width; col++) {
    for (let row = 0; row < height; row++) {
      if (lights.getLight(col, row)) counter++;
    }
  }

  return counter;
};

export default lights;
