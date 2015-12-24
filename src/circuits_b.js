let circuits = {};

circuits.createWires = function (input) { // input form: <instruction> -> <token>\n
  let rows = input.split('\n');
  let wires = {};
  let reg = /([\w\d\s]*\S)\s*\-\>\s*(\w+)/;
  for (let row of rows) {
    let instruction, wireName;
    let extracts = row.match(reg);
    if (true) {
      instruction = extracts[1];
      wireName = extracts[2];
      wires[ wireName ] = {
        instruction: instruction
      };
    }
  }
  return wires;
}; 

circuits.makeValues = function (wires) {
  let wireNames = Object.keys(wires);
  for (let wireName of wireNames) {
    let wire = wires[wireName];
    circuits.makeValue(wires, wire);
  }
};

circuits.makeValue = function (wires, wire) {
    if (typeof wire.value === 'undefined') {
      let instruction = circuits.tokenizeInstruction(wire.instruction);
      if ( instruction.length === 1) {  // it must be a simple value
        circuits.makeSimpleValue(wires, wire);
      }
      else if (instruction[0] === 'NOT') {
        circuits.make_NOT_Value(wires, wire, instruction);
      }
      else if (instruction[1] === 'LSHIFT') {
         circuits.make_LSHIFT_Value(wires, wire, instruction);
      }
      else if (instruction[1] === 'RSHIFT') {
         circuits.make_RSHIFT_Value(wires, wire, instruction);
      }
      else if (instruction[1] === 'OR') {
        circuits.make_OR_Value(wires, wire, instruction);
      }
      else if (instruction[1] === 'AND') {
        circuits.make_AND_Value(wires, wire, instruction);
      }
      else {
        throw new Error(instruction[1], 'unknown token');
      }
    }
};

circuits.tokenizeInstruction = function (instruction) {
  let reg = /([\d\w]+)/g;
  let tokens = instruction.match(reg);
  if (tokens) {
    return tokens;
  }
};

circuits.makeSimpleValue = function (wires, wire) {
  if ( !isNaN(wire.instruction) ) { // it is a simple number
    wire.value = Number(wire.instruction);
  } 
  else if ( typeof wires[ wire.instruction ].value === 'undefined') {
    circuits.makeValue(wires, wires[ wire.instruction ]);
    wire.value = wires[ wire.instruction ].value;
  }
};

circuits.make_NOT_Value = function (wires, wire, instruction) {
  if ( typeof wires[ instruction[1] ].value === 'undefined') {
    circuits.makeValue(wires, wires[ instruction[1] ]);
  }
  wire.value = ~(wires[ instruction[1] ].value);
};

circuits.make_LSHIFT_Value = function (wires, wire, instruction) {
    if ( typeof wires [ instruction[0] ].value === 'undefined') {
      circuits.makeValue(wires, wires[ instruction[0] ]);
    }
    wire.value = wires[ instruction[0] ].value << Number(instruction[2]);
};

circuits.make_RSHIFT_Value = function (wires, wire, instruction) {
    if ( typeof wires [ instruction[0] ].value === 'undefined') {
      circuits.makeValue(wires, wires[ instruction[0] ]);
    }
    wire.value = wires[ instruction[0] ].value >> Number(instruction[2]);
};

circuits.make_OR_Value = function (wires, wire, instruction) {
    if ( typeof wires [ instruction[0] ].value === 'undefined') {
      circuits.makeValue(wires, wires[ instruction[0] ]);
    }
    if ( typeof wires [ instruction[2] ].value === 'undefined') {
      circuits.makeValue(wires, wires[ instruction[2] ]);
    }
    wire.value = wires[ instruction[0] ].value | wires[ instruction[2] ].value;
};

circuits.make_AND_Value = function (wires, wire, instruction) {
  let left;
  if ( !isNaN(instruction[0]) ) { // left operand is a simple number
    left = Number(instruction[0]);
  }
  else if ( typeof wires [ instruction[0] ].value === 'undefined') {
    circuits.makeValue(wires, wires[ instruction[0] ]);
    left = wires[ instruction[0] ].value;
  }
  else {
    left = wires[ instruction[0] ].value;
  }

  let right;
  if ( !isNaN(instruction[2]) ) { // left operand is a simple number
    right = Number(instruction[2]);
  }
  else if ( typeof wires [ instruction[2] ].value === 'undefined') {
    circuits.makeValue(wires, wires[ instruction[2] ]);
    right = wires[ instruction[2] ].value;
  }
  else {
    right = wires[ instruction[2] ].value;
  }

  wire.value = left & right;
};
export default circuits;
