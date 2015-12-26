import lights from '../src/day6_lights'

describe('test puzzle 6', () => {
  beforeEach( () => {
    let columns = 5, rows = 5, initValue = false;
    lights.initTable({ columns: columns, rows: rows, initValue: initValue });
  });

  it('should set and get a light', () => {
    let x = 3;
    let y = 3;
    lights.setLight(x, y, true);
    expect(lights.getLight(x, y)).to.equal(true);
  });

  it('should set range', () => {
    let x1 = 0, x2 = 1, y1 = 0, y2 = 1;
    lights.setRange({ x1: x1, y1: y1, x2: x2, y2: y2, value: true });
    expect(lights.getLight(x1, y1)).to.equal(true);
    expect(lights.getLight(x1, y2)).to.equal(true);
    expect(lights.getLight(x2, y1)).to.equal(true);
    expect(lights.getLight(x2, y2)).to.equal(true);
  });

  it('should toggle range', () => {
    let x1 = 0, x2 = 1, y1 = 0, y2 = 1;
    lights.setRange({ x1: x1, y1: y1, x2: x2, y2: y2, value: true });
    lights.setRange({ x1: x1, y1: y1, x2: x2, y2: y2, toggle: true });
    expect(lights.getLight(x1, y1)).to.equal(false);
    expect(lights.getLight(x1, y2)).to.equal(false);
    expect(lights.getLight(x2, y1)).to.equal(false);
    expect(lights.getLight(x2, y2)).to.equal(false);
  });

  it('should make toggle instructions', () => {
    let row = 'toggle 2,1 through 3,4';
    let instruction = lights.getInstruction(row);
    expect(instruction[0]).to.equal('toggle');
    expect(instruction[1]).to.equal(2);
    expect(instruction[2]).to.equal(1);
    expect(instruction[3]).to.equal(3);
    expect(instruction[4]).to.equal(4);
  });

  it('should make turn on instructions', () => {
    let row = 'turn on 2,1 through 3,4';
    let instruction = lights.getInstruction(row);
    expect(instruction[0]).to.equal('turn on');
    expect(instruction[1]).to.equal(2);
    expect(instruction[2]).to.equal(1);
    expect(instruction[3]).to.equal(3);
    expect(instruction[4]).to.equal(4);
  });

  it('should make turn off instructions', () => {
    let row = 'turn off 2,1 through 3,4';
    let instruction = lights.getInstruction(row);
    expect(instruction[0]).to.equal('turn off');
    expect(instruction[1]).to.equal(2);
    expect(instruction[2]).to.equal(1);
    expect(instruction[3]).to.equal(3);
    expect(instruction[4]).to.equal(4);
  });

  it('should process instructions', () => {
    let input = 'turn on 0,0 through 1,1\n' +
      'toggle 1,1 through 2,2';
    lights.process(input);
    expect(lights.getLight(0, 0)).to.equal(true);
    expect(lights.getLight(1, 1)).to.equal(false);
    expect(lights.getLight(2, 2)).to.equal(true);
  });

  it('should count switched on lights', () => {
    let input = 'turn on 0,0 through 1,1\n' +
      'toggle 1,1 through 2,2';
    lights.process(input);
    expect(lights.count()).to.equal(6); 
  });
});
