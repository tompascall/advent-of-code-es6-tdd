let circuits_b = {};

circuits_b.createWires = function (input) { // input form: <instruction> -> <token>\n
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

circuits_b.makePromises = function (wires) {
  let wireNames = Object.keys(wires);
  for (let wireName of wireNames) {
    let wire = wires[wireName];
    circuits_b.makePromise(wires, wire);
  }
};

circuits_b.makePromise = function (wires, wire) {
    if (typeof wire.value === 'undefined') {
      let instruction = circuits_b.tokenizeInstruction(wire.instruction);
      if ( instruction.length === 1) {  // it must be a simple value
        circuits_b.makeSimpleValuePromise(wires, wire);
      }
      else if (instruction[0] === 'NOT') {
        circuits_b.make_NOT_Promise(wires, wire, instruction);
      }
      else if (instruction[1] === 'LSHIFT') {
         circuits_b.make_LSHIFT_Promise(wires, wire, instruction);
      }
      else if (instruction[1] === 'RSHIFT') {
         circuits_b.make_RSHIFT_Promise(wires, wire, instruction);
      }
      else if (instruction[1] === 'OR') {
        circuits_b.make_OR_Promise(wires, wire, instruction);
      }
      else if (instruction[1] === 'AND') {
        circuits_b.make_AND_Promise(wires, wire, instruction);
      }
      else {
        throw new Error(instruction[1], 'unknown token');
      }
    }
};

circuits_b.tokenizeInstruction = function (instruction) {
  let reg = /([\d\w]+)/g;
  let tokens = instruction.match(reg);
  if (tokens) {
    return tokens;
  }
};

circuits_b.makeSimpleValuePromise = function (wires, wire) {
  if (!isNaN(wire.instruction)) { 
    wire.value = new Promise( (resolve) => {
      resolve(Number(wire.instruction));
    });
  } 
  else if ( typeof wires[ wire.instruction ].value === 'undefined') {
    circuits_b.makePromise(wires, wires[ wire.instruction ]);
    wire.value = new Promise( (resolve) => {
      resolve(wires[ wire.instruction].value);
    }); 
  }
};

circuits_b.make_NOT_Promise = function (wires, wire, instruction) {
  wire.value = new Promise( (resolve) => {
    if ( typeof wires[ instruction[1] ].value === 'undefined') {
      circuits_b.makePromise(wires, wires[ instruction[1] ]);
    }
    wires[ instruction[1] ].value.then( (value) => {
      resolve(~value);
    }); 
  });
};

circuits_b.make_LSHIFT_Promise = function (wires, wire, instruction) {
  wire.value = new Promise( (resolve) => {
    if ( typeof wires [ instruction[0] ].value === 'undefined') {
      circuits_b.makePromise(wires, wires[ instruction[0] ]);
    }
    wires[ instruction[0] ].value.then( (value) => {
      resolve( value << Number(instruction[2]) );
    }); 
  });
};

circuits_b.make_RSHIFT_Promise = function (wires, wire, instruction) {
  wire.value = new Promise( (resolve) => {
    if ( typeof wires [ instruction[0] ].value === 'undefined') {
      circuits_b.makePromise(wires, wires[ instruction[0] ]);
    }
    wires[ instruction[0] ].value.then( (value) => {
      resolve( value >> Number(instruction[2]) );
    }); 
  });
};

circuits_b.make_OR_Promise = function (wires, wire, instruction) {
  wire.value = new Promise( (resolve) => {
    if ( typeof wires [ instruction[0] ].value === 'undefined') {
      circuits_b.makePromise(wires, wires[ instruction[0] ]);
    }
    if ( typeof wires [ instruction[2] ].value === 'undefined') {
      circuits_b.makePromise(wires, wires[ instruction[2] ]);
    }
    let promises = [ wires[ instruction[0] ].value, wires[ instruction[2] ].value ];
    Promise.all(promises).then(results => {
      resolve(results[0] | results[1]);
    });
  });
};

circuits_b.make_AND_Promise = function (wires, wire, instruction) {
  let promises = [];
  wire.value = new Promise( (resolve) => {
    if ( !isNaN(instruction[0]) ) {
      let simpleValuePromise = new Promise( (resolve) => {
        resolve(Number(instruction[0]));
      })
      promises.push(simpleValuePromise);
    }
    else if ( typeof wires [ instruction[0] ].value === 'undefined') {
      circuits_b.makePromise(wires, wires[ instruction[0] ]);
      promises.push(wires[ instruction[0] ].value);
    }
    else {
      promises.push(wires[ instruction[0] ].value);
    }

    
    if ( !isNaN(instruction[2]) ) {
      promises.push(new Promise( (resolve) => {
        resolve(Number(instruction[2]));
      }));
    }
    else if ( typeof wires [ instruction[2] ].value === 'undefined') {
      circuits_b.makePromise(wires, wires[ instruction[2] ]);
      promises.push(wires[ instruction[2] ].value);
    }
    else {
      promises.push(wires[ instruction[2] ].value);
    }
    Promise.all(promises).then(results => {
      resolve(results[0] & results[1]);
    });
  });
};
export default circuits_b;
