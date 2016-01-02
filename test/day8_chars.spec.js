import Chars from '../src/day8_chars';

describe('test 8th puzzle', () => {
  let chars;
  
  it('should count the number of characters of code for string literals', () => {
    let raw = String.raw`"asdf\""
"a\"b\\c\xff"
""
"\\\"\xaa"`;
    chars = new Chars(raw);
    let counters = chars.counter();
    expect(counters.code).to.equal(33);  
  });

  it('should count the number of characters in memory', () => {
    let raw = String.raw`"asdf\""
"a\"b\\c\xff"
""
"\\\"\xaa"`;
    chars = new Chars(raw);
    expect(chars.counter().mem).to.equal(14); 
  });

  it('should count the number of characters in string as input would be in memory', () => {
    let raw = String.raw`"a\"b\\c\xff"`;
    chars = new Chars(raw);
    expect(chars.counter().invert).to.equal(22); // 13 + 9
  });
});
