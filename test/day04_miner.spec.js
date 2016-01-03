import miner from '../src/day04_miner';

describe('test miner', () => {
  it('should give back an md5 hash', () => {
    let coin = miner.getCoin();
    expect(/^[0-9a-fA-F]{32}$/.test(coin.hash)).to.equal(true);
  });

  it('should give back a md5 hash with a pattern', () => {
    let pattern = '^0',
        coin = miner.getCoin({pattern: pattern});
    expect(/^0/.test(coin.hash)).to.equal(true);
  });
});
