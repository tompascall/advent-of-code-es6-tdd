import xanta from '../src/floors';

describe('Floor calculator', () => {
    
  it('should be stay on ground floor', () => {
    expect(xanta.getDestination('').current).to.equal(0);
  });
  
  it('should be 3', () => {
    expect(xanta.getDestination('(((').current).to.equal(3);
  });


  it('should be -3', () => {
    expect(xanta.getDestination(')))').current).to.equal(-3);
  });


  it('should be 3-1', () => {
    expect(xanta.getDestination('((()').current).to.equal(2);
  });
});
