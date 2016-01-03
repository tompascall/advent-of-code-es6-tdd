import {SimpleLights, TrickyLights} from '../src/day06_lights';

describe('test first part of puzzle 6', () => {
  let simpleLights;

  beforeEach( () => {
    let columns = 5, rows = 5, initValue = 0;
    simpleLights = new SimpleLights({ columns: columns, rows: rows, initValue: initValue });
  });

  it('should set and get a light', () => {
    let x = 3;
    let y = 3;
    simpleLights.setLight(x, y, 1);
    expect(simpleLights.getLight(x, y)).to.equal(1);
  });

  it('should set range', () => {
    let x1 = 0, x2 = 1, y1 = 0, y2 = 1;
    simpleLights.setRange({ x1: x1, y1: y1, x2: x2, y2: y2, value: 1 });
    expect(simpleLights.getLight(x1, y1)).to.equal(1);
    expect(simpleLights.getLight(x1, y2)).to.equal(1);
    expect(simpleLights.getLight(x2, y1)).to.equal(1);
    expect(simpleLights.getLight(x2, y2)).to.equal(1);
  });

  it('should toggle range', () => {
    let x1 = 0, x2 = 1, y1 = 0, y2 = 1;
    simpleLights.setRange({ x1: x1, y1: y1, x2: x2, y2: y2, value: 1 });
    simpleLights.setRange({ x1: x1, y1: y1, x2: x2, y2: y2, toggle: 1 });
    expect(simpleLights.getLight(x1, y1)).to.equal(0);
    expect(simpleLights.getLight(x1, y2)).to.equal(0);
    expect(simpleLights.getLight(x2, y1)).to.equal(0);
    expect(simpleLights.getLight(x2, y2)).to.equal(0);
  });

  it('should make toggle instructions', () => {
    let row = 'toggle 2,1 through 3,4';
    let instruction = simpleLights.getInstruction(row);
    expect(instruction[0]).to.equal('toggle');
    expect(instruction[1]).to.equal(2);
    expect(instruction[2]).to.equal(1);
    expect(instruction[3]).to.equal(3);
    expect(instruction[4]).to.equal(4);
  });

  it('should make turn on instructions', () => {
    let row = 'turn on 2,1 through 3,4';
    let instruction = simpleLights.getInstruction(row);
    expect(instruction[0]).to.equal('turn on');
    expect(instruction[1]).to.equal(2);
    expect(instruction[2]).to.equal(1);
    expect(instruction[3]).to.equal(3);
    expect(instruction[4]).to.equal(4);
  });

  it('should make turn off instructions', () => {
    let row = 'turn off 2,1 through 3,4';
    let instruction = simpleLights.getInstruction(row);
    expect(instruction[0]).to.equal('turn off');
    expect(instruction[1]).to.equal(2);
    expect(instruction[2]).to.equal(1);
    expect(instruction[3]).to.equal(3);
    expect(instruction[4]).to.equal(4);
  });

  it('should process instructions', () => {
    let input = 'turn on 0,0 through 1,1\n' +
      'toggle 1,1 through 2,2';
    simpleLights.process(input);
    expect(simpleLights.getLight(0, 0)).to.equal(1);
    expect(simpleLights.getLight(1, 1)).to.equal(0);
    expect(simpleLights.getLight(2, 2)).to.equal(1);
  });

  it('should count switched on lights', () => {
    let input = 'turn on 0,0 through 1,1\n' +
      'toggle 1,1 through 2,2';
    simpleLights.process(input);
    expect(simpleLights.count()).to.equal(6); 
  });
});

describe('test second part of puzzle 6', () => {
let trickyLights;

  beforeEach( () => {
    let columns = 5, rows = 5, initValue = 0;
    trickyLights = new TrickyLights({ columns: columns, rows: rows, initValue: initValue });
  });

  it('should set and get a light', () => {
    let x = 3;
    let y = 3;
    trickyLights.setLight(x, y, 1);
    expect(trickyLights.getLight(x, y)).to.equal(1);
  });

  it('should set range', () => {
    let x1 = 0, x2 = 1, y1 = 0, y2 = 1;
    trickyLights.setRange({ x1: x1, y1: y1, x2: x2, y2: y2, value: 3 });
    expect(trickyLights.getLight(x1, y1)).to.equal(3);
    expect(trickyLights.getLight(x1, y2)).to.equal(3);
    expect(trickyLights.getLight(x2, y1)).to.equal(3);
    expect(trickyLights.getLight(x2, y2)).to.equal(3);
  });
 
  it('should +2 range if get toggle instruction', () => {
    let x1 = 0, x2 = 1, y1 = 0, y2 = 1;
    trickyLights.setRange({ x1: x1, y1: y1, x2: x2, y2: y2, value: 1 });
    trickyLights.setRange({ x1: x1, y1: y1, x2: x2, y2: y2, toggle: true });
    expect(trickyLights.getLight(x1, y1)).to.equal(3);
    expect(trickyLights.getLight(x1, y2)).to.equal(3);
    expect(trickyLights.getLight(x2, y1)).to.equal(3);
    expect(trickyLights.getLight(x2, y2)).to.equal(3);
  });
 
  it('should process instructions', () => {
    let input = 'turn on 0,0 through 1,1\n' +
      'turn on 0,0 through 1,1\n' +
      'toggle 1,1 through 2,2';
    trickyLights.process(input);
    expect(trickyLights.getLight(0, 0)).to.equal(2);
    expect(trickyLights.getLight(1, 1)).to.equal(4);
    expect(trickyLights.getLight(2, 2)).to.equal(2);
  });
 
  it('should count the value of switched lights', () => {
    let input = 'turn on 0,0 through 1,1\n' +
      'toggle 1,1 through 2,2\n' +
      'turn off 0,0 through 1,1';
    trickyLights.process(input);
    expect(trickyLights.count()).to.equal(8); 
  });
   
});

