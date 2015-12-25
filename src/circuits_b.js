let circuits = {};

circuits.createWires = function (input) { // input form: <instruction> -> <token>\n
  let rows = input.split('\n');
  let wires = {},
      wireData;

  for (let row of rows) {
    wireData = getWireDataFromRow(row);
    wires[ wireData.wireName ] = {
      instruction: wireData.instruction
    };
  }
  
  return wires;

  function getWireDataFromRow (row) {
    let reg = /([\w\d\s]*\S)\s*\-\>\s*(\w+)/;
    let instruction, wireName;
    let extracts = row.match(reg);
    if (extracts) {
      instruction = extracts[1];
      wireName = extracts[2];
      return { wireName: wireName, instruction: instruction }; 
    }
    else {
      throw new Error('Bad input format /input format shoud be <instruction> -> <token>\n/');
    }
  }
}; 

circuits.makeValues = function (wires) {
  let wireNames = Object.keys(wires);
  for (let wireName of wireNames) {
    let wire = wires[wireName];
    circuits.makeValue(wires, wire);
  }
};

circuits.makeValue = function (wires, wire) {
  let instructionsWithTwoOperands = ['LSHIFT', 'RSHIFT', 'OR', 'AND'];
  if (typeof wire.value === 'undefined') {
    let instruction = tokenizeInstruction(wire.instruction);

    if (instruction.length === 1) { // it must be a simple value or another wire
      circuits.makeSimpleValue(wires, wire);
    }
    else if (instruction.length === 2) { // for the moment the only case is the NOT instruction
      circuits.make_NOT_Value(wires, wire, instruction);
    }
    else if (instruction.length === 3 && instructionsWithTwoOperands.indexOf( instruction[1] ) > -1) {
      circuits['make_' + instruction[1] + '_Value'](wires, wire, instruction);
    }
    else throw new Error('Unknown token');
  }

  function tokenizeInstruction (instruction) {
    let reg = /([\d\w]+)/g;
    let tokens = instruction.match(reg);
    if (tokens) {
      return tokens;
    }
  }
};

circuits.makeSimpleValue = function (wires, wire) {
  if ( !isNaN(wire.instruction) ) { // it is a simple number
    let simpleValue = Number(wire.instruction);
    wire.value = simpleValue;
  } 
  else {
    let producerWireName = wire.instruction;
    if ( typeof wires[ producerWireName ].value === 'undefined') { // it is another wire
      circuits.makeValue(wires, wires[ producerWireName ]);
      wire.value = wires[ producerWireName ].value;
    }
  }
};

circuits.make_NOT_Value = function (wires, wire, instruction) {
  let producerWireName = instruction[1];
  if ( typeof wires[ producerWireName ].value === 'undefined') {
    circuits.makeValue(wires, wires[ producerWireName ]);
  }
  wire.value = ~(wires[ producerWireName ].value);
};

circuits.makeShiftValue = function (wires, wire, instruction, direction) {
  let producerWireName = instruction[0],
      shiftValue = instruction[2];
  if ( typeof wires [ producerWireName ].value === 'undefined') {
    circuits.makeValue(wires, wires[ producerWireName ]);
  }
  if (direction === 'left') {
    wire.value = wires[ producerWireName ].value << Number(shiftValue);
  } 
  else {
    wire.value = wires[ producerWireName ].value >> Number(shiftValue);
  }
}

circuits.make_LSHIFT_Value = function (wires, wire, instruction) {
  circuits.makeShiftValue(wires, wire, instruction, 'left');
};

circuits.make_RSHIFT_Value = function (wires, wire, instruction) {
  circuits.makeShiftValue(wires, wire, instruction, 'right');
};

circuits.makeAndOrValue = function (wires, wire, instruction, type) {
  let left;
  if ( !isNaN(instruction[0]) ) { // left operand is a simple number
    left = Number(instruction[0]);
  }
  else {
    let leftProducerWireName = instruction[0];
    if ( typeof wires [ leftProducerWireName ].value === 'undefined') {
      circuits.makeValue(wires, wires[ leftProducerWireName ]);
    }
    left = wires[ leftProducerWireName ].value;
  }

  let right;
  if ( !isNaN(instruction[2]) ) { // left operand is a simple number
    right = Number(instruction[2]);
  }
  else {
    let rightProducerWireName = instruction[2];
    if ( typeof wires [ rightProducerWireName ].value === 'undefined') {
      circuits.makeValue(wires, wires[ rightProducerWireName ]);
    }
    right = wires[ rightProducerWireName ].value;
  }

  wire.value = (type === 'OR') ? left | right : left & right;
};

circuits.make_OR_Value = function (wires, wire, instruction) {
  circuits.makeAndOrValue(wires, wire, instruction, 'OR');
};

circuits.make_AND_Value = function (wires, wire, instruction) {
  circuits.makeAndOrValue(wires, wire, instruction, 'AND');
};

export default circuits;
