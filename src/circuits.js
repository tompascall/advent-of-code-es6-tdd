let circuits = {};

circuits.createWireInputs = function (input) { // input form: <instruction> -> <token>\n
  let rows = input.split('\n');
  let wireInputs = {};
  let reg = /(\S[\w\d\s]+\S)\s*\-\>\s*(\w+)/;
  for (let row of rows) {
    let instruction, wireName;
    let extracts = row.match(reg);
    instruction = extracts[1];
    wireName = extracts[2];
    if (extracts) { 
      wireInputs[ wireName ] = {
        instruction: instruction
      };
    }
  }
  console.log(wireInputs);
  return wireInputs;
}; 

circuits.makePromises = function (wireInputs) {
  let wireNames = Object.keys(wireInputs);
  for (let wireName of wireNames) { // e.g. x
    let wire = wireInputs[wireName];
    let instruction = wire.instruction;
    if ( !isNaN(instruction) ) {
      circuits.makeSimpleValuePromise(wire);
    }
  }
};

circuits.makeSimpleValuePromise = function (wire) {
  wire.value = new Promise( (resolve) => {
    resolve(Number(wire.instruction));
  })
};

export default circuits;
