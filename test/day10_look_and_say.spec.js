import Las from '../src/day10_look_and_say';

describe('Testing the 10th puzzle', () => {
  let las,
      input = '21';

  beforeEach( () => {
    las = new Las({input});
  });  

  it('should count the equal chars and create the new string', () => {
    expect(las.iterate(input)).to.deep.equal('1211');
  });

  it('should get length after iterations', () => {
    let iter = 4; // 1211, 111221, 312211, 12112221
    expect(las.getLength(iter)).to.equal(8);
  });
});
