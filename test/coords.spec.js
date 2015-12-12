import Coords from '../src/coords';

describe('test coords', () => {
  let coords;
 
  beforeEach( () => {
    coords = new Coords(0, 0);
  }); 

  it('should get position', () => {
    expect(coords.currentCoords.x).to.equal(0); 
    expect(coords.currentCoords.y).to.equal(0); 
  });

  it('should save current position', () => {
    expect(coords.savedCoords['0;0']).to.equal(1);
    coords.currentCoords = {x: 1, y: 1};
    coords.saveCoord();
    expect(coords.savedCoords['1;1']).to.equal(1); 
    coords.saveCoord();
    expect(coords.savedCoords['1;1']).to.equal(2);
  });

  it('should move current position', () => {
    coords.move('>');
    expect(coords.currentCoords.x).to.equal(1);  
    expect(coords.currentCoords.y).to.equal(0);  
    coords.move('v');
    expect(coords.currentCoords.x).to.equal(1);  
    expect(coords.currentCoords.y).to.equal(-1);  
    coords.move('<');
    expect(coords.currentCoords.x).to.equal(0);  
    expect(coords.currentCoords.y).to.equal(-1);  
    coords.move('^');
    expect(coords.currentCoords.x).to.equal(0);  
    expect(coords.currentCoords.y).to.equal(0);  
  });

  it('should travel', () => {
    coords.travel('>>^^<v'); // result: 1;1
    expect(coords.currentCoords.x).to.equal(1);  
    expect(coords.currentCoords.y).to.equal(1);  
  });

  it('should save coords during travel', () => {
    coords.travel('>><<');
    expect(coords.savedCoords['0;0']).to.equal(2);
    expect(coords.savedCoords['1;0']).to.equal(2);
    expect(coords.savedCoords['2;0']).to.equal(1);
  });

  it('should count different locations', () => {
    coords.travel('>><<');
    expect(coords.countDiffLocations()).to.equal(3); 
  });
});
