import circuits from '../src/circuits_b';

describe('test day 7 puzzle: circuits', () => {

  it('should extract wireNames and instructions from input to an object', () => {
    let input =  `x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
123 -> x
456 -> y`;
    let wires = circuits.createWires(input);
    expect(Object.keys(wires).length).to.equal(8);
    expect(wires.y.instruction).to.equal('456');
    expect(wires.e.instruction).to.equal('x OR y');
  });

  it('should make value from simple value instruction', () => {
    let input = '123 -> x';
    let wires = circuits.createWires(input);
    circuits.makeValues(wires);
    expect(wires.x.value).to.equal(123);
  })

  it('should make value from `NOT x` type instructions', () => {
    let input = `NOT x -> y
                 123 -> x`;
    let wires = circuits.createWires(input);
    circuits.makeValues(wires);
    expect(wires.y.value).to.equal(~123);
  });
 
  it('should make value from `x LSHIFT` type instructions', () => {
    let input = `x LSHIFT 2 -> y
                 123 -> x`
    let wires = circuits.createWires(input);
    circuits.makeValues(wires);
    expect(wires.y.value).to.equal(123 << 2);
  }); 

  it('should make value from `x RSHIFT` type instructions', () => {
    let input = `x RSHIFT 2 -> y
                 123 -> x`
    let wires = circuits.createWires(input);
    circuits.makeValues(wires);
    expect(wires.y.value).to.equal(123 >> 2);
  }); 
 
  it('should make values from `x OR y` type instructions', () => {
    let input = `x OR y -> z
                 123 -> x
                 456 -> y`
    let wires = circuits.createWires(input);
    circuits.makeValues(wires);
    expect(wires.z.value).to.equal(123 | 456);
  }); 
 
  it('should make values from `1 AND y` type instructions', () => {
    let input = `1 AND y -> z
                 456 -> y`
    let wires = circuits.createWires(input);
    circuits.makeValues(wires);
    expect(wires.z.value).to.equal(1 & 456);
  });

  it('should make values from `x AND y` type instructions', () => {
   let input = `x AND y -> z
                123 -> x
                456 -> y`
   let wires = circuits.createWires(input);
   circuits.makeValues(wires);
   expect(wires.z.value).to.equal(123 & 456);
  });

  it('should get value of another wire', () => {
   let input = 'y -> x\n456 -> y';
   let wires = circuits.createWires(input);
   circuits.makeValues(wires);
   expect(wires.x.value).to.equal(456);
  });
});
