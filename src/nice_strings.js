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
};

nice.processor = function (input, method) {
  let words = input.split('\n'),
      counter = 0;
  
  for (let word of words) {
    if (method(word)) {
      counter++;
    }
  }
  return counter;
};

nice.betterCheck = function (word) {
  return checkDoubles(word) && checkBurgerPattern(word);

  function checkDoubles (word) {
    let firstTwo = word.slice(0,2);
    let remainedWord = word.slice(2);
    if ( remainedWord.includes(firstTwo) ) {
      //console.log('true', remainedWord, firstTwo);
      return true;
    }
    if ( remainedWord.length > 2) {
      //console.log('iterate', remainedWord, firstTwo);
      return checkDoubles(word.slice(1));
    }
    else {
      return false;
    }
  }

  function checkBurgerPattern (word) {
    let reg = /([a-z])[a-z]\1/;
    return reg.test(word);
  }
};

export default nice;
