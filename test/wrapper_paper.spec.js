import wrapper from '../src/wrapper_paper';

describe('test wrapper', () => {
  var a = 20, b = 11, c = 3;
  it('should calc wrapper paper for 1 box', () => {
    var boxDimensions = '20x3x11';
    expect(wrapper.calc(boxDimensions)).to.equal(2 * (a * c + c * b + a * b) + c * b);
  });

  it('should calc wrapper paper for more boxes', () => {
    var boxDimensions = '20x3x11\n20x3x11';
    expect(wrapper.calc(boxDimensions)).to.equal(2 * (2 * (a * c + c * b + a * b) + c * b));
  });

  it('should also alculate well if box is a cube or the two longer side are equal', () => {
    var boxDimensions = '2x2x2\n2x2x2';
    a = b = c = 2;
    expect(wrapper.calc(boxDimensions)).to.equal(2 * (2 * (a * c + c * b + a * b) + c * b));
  
    boxDimensions = '2x2x1\n2x2x1';
    c = 1;
    expect(wrapper.calc(boxDimensions)).to.equal(2 * (2 * (a * c + c * b + a * b) + c * b));
  }); 
});
