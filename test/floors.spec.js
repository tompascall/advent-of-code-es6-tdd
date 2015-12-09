import floors from '../src/floors';

describe('Floor calculator', () => {
    
  it('should be stay on ground floor', () => {
    expect(floors('')).to.equal(0);
  });
  
  it('should be 3', () => {
    expect(floors('(((')).to.equal(3);
  });


  it('should be -3', () => {
    expect(floors(')))')).to.equal(-3);
  });


  it('should be 3-1', () => {
    expect(floors('((()')).to.equal(2);
  });
});
