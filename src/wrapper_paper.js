var wrapper = {};

wrapper.calc = function (boxDimensions) {
  let lengths = getSideLengths(boxDimensions);
  let min = getMinLength(lengths);
  return min + 2 * (lengths[0] * lengths[1] + lengths[0] * lengths[2] + lengths[1] * lengths[2]);
};

function getSideLengths (boxDimensions) {
  let re = /(\d+)x(\d+)x(\d+)/;
  let dims = boxDimensions.match(re);
  dims.shift();
  return dims;
}

function getMinLength(lengths) {
  return Math.min(...lengths);
}

export default wrapper;
