import miner from './day04_miner';

let index = miner.getCoin({
  secret: 'bgvyzdsv',
  pattern: '^0{5}'
}).index;

console.log('Your mined number is', index);
