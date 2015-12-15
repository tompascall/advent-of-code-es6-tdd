var nice = {};

nice.checkWord = function (word) {
  
  return has3Vowel(word) && hasTwins(word) && notContain(word);

  function has3Vowel (word) {
    let hits = word.match( /([aeiou])/g );
    return (hits) ? hits.length >= 3 : false;
  }

  function hasTwins (word) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let reg = '';
    for (let letter of alphabet) {
      reg = reg + letter + letter;
      if (letter !== 'z') {
        reg += '|';
      } 
    }
    return new RegExp(reg).test(word);
  }

  function notContain (word) {
    return !(/ab/.test(word) ||
        /cd/.test(word) ||
        /pq/.test(word) ||
        /xy/.test(word));
  }
}

nice.processor = function (input) {
  let words = input.split('\n'),
      counter = 0;
  
  for (let word of words) {
    if (nice.checkWord(word)) {
      counter++;
    }
  }
  return counter;
};

export default nice;
