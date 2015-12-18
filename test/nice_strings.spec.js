import nice_strings from '../src/nice_strings';

describe('checking nice strings', () => {
  it('should be ok if there is at least 3 vowels (aeiou) in the word', () => {
    expect(nice_strings.checkWord('sdffaaeisdf')).to.equal(true);
    expect(nice_strings.checkWord('aemmor')).to.equal(true);
    expect(nice_strings.checkWord('aem')).to.equal(false);
  });

  it('should check if there are twins', () => {
    expect(nice_strings.checkWord('aaemor')).to.equal(true);
    expect(nice_strings.checkWord('aemmor')).to.equal(true);
    expect(nice_strings.checkWord('aemozz')).to.equal(true);
    expect(nice_strings.checkWord('aemor')).to.equal(false);
  });

  it('should be false if there is ab, cd, pq, xy', () => {
    expect(nice_strings.checkWord('aabemor')).to.equal(false);
    expect(nice_strings.checkWord('aacdemor')).to.equal(false);
    expect(nice_strings.checkWord('aapqmor')).to.equal(false);
    expect(nice_strings.checkWord('aabxymor')).to.equal(false);
  });

  it('should process words input', () => {
    sinon.spy(nice_strings, 'checkWord');
    let niceWords = nice_strings.processor('aaemor\nsdfg\ndfgh', nice_strings.checkWord);
    expect(niceWords).to.equal(1);
    expect(nice_strings.checkWord.callCount).to.equal(3);
    nice_strings.checkWord.restore();
  });
});

describe('check better check', () => {
  it('should check doubles', () => {
    expect(nice_strings.betterCheck('xyxy')).to.equal(true);
    expect(nice_strings.betterCheck('xaaazx')).to.equal(false);
    expect(nice_strings.betterCheck('xyzxyzy')).to.equal(true);
  });

  it('should check burger pattern', () => {
    expect(nice_strings.betterCheck('xyxzxy')).to.equal(true);
    expect(nice_strings.betterCheck('xyaaxy')).to.equal(false);
    expect(nice_strings.betterCheck('xyaaaxy')).to.equal(true);
    expect(nice_strings.betterCheck('xyxy')).to.equal(true);
  });
});
