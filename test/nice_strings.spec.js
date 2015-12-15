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

  it('should check ab, cd, pq, xy', () => {
    expect(nice_strings.checkWord('aabemor')).to.equal(false);
    expect(nice_strings.checkWord('aacdemor')).to.equal(false);
    expect(nice_strings.checkWord('aapqmor')).to.equal(false);
    expect(nice_strings.checkWord('aabxymor')).to.equal(false);
  });

  it('should process words input', () => {
    sinon.spy(nice_strings, 'checkWord');
    let niceWords = nice_strings.processor('aaemor\nsdfg\ndfgh');
    expect(niceWords).to.equal(1);
    expect(nice_strings.checkWord.callCount).to.equal(3);
    nice_strings.checkWord.restore();
  });
});
