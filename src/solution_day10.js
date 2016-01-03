import Las from '../src/day10_look_and_say';
let input = '3113322113';
let las = new Las({input});
console.log(`Length of input after 40 iteration is ${las.getLength(40)}.`);
console.log(`Length of input after 50 iteration is ${las.getLength(50)}.`);
