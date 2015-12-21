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


export default circuits;
