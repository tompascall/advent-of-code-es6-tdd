  let miner = {};

miner.getCoin = function (options = {}) {
  let secret = options.secret || '',
      reg = new RegExp(options.pattern),
      md5 = require("blueimp-md5").md5 || require("blueimp-md5"),
      index = 0,
      message,
      hash;

  while (true) {
    message = secret + index;
    hash = md5(message);
    if (reg.test(hash)) {
      break;
    };
    index++;
  }
  miner.index = index;
  return miner;
}

export default miner;
