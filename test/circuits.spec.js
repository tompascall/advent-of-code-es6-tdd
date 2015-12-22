import circuits from '../src/circuits';

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
    let wireInputs = circuits.createWireInputs(input);
    expect(Object.keys(wireInputs).length).to.equal(8);
    expect(wireInputs.y.instruction).to.equal('456');
    expect(wireInputs.e.instruction).to.equal('x OR y');
  });

  it('should make promises from simple value instruction', () => {
    let input = `123 -> x
                 456 -> y`;
    let wireInputs = circuits.createWireInputs(input);
    circuits.makePromises(wireInputs);
    return wireInputs.x.value.then( (value) => {
      expect(value).to.equal(123);
    })
  });
});
