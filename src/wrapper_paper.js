var wrapper = {};

wrapper.calc = function (boxDimensions) {
  let boxes = getBoxes(boxDimensions);
  let result = 0;
  for (let box of boxes) {
    result += calcOneBox(box);
  }
  return result;
};

function getBoxes(boxDimensions) {
  return boxDimensions.split('\n');
}

function calcOneBox (box) {
  let lengths = getSideLengths(box);
  let minSide = getMinSide(lengths);
  return minSide + 2 * (lengths[0] * lengths[1] + lengths[0] * lengths[2] + lengths[1] * lengths[2]);
}

function getSideLengths (boxDimensions) {
  let re = /(\d+)x(\d+)x(\d+)/;
  let dims = boxDimensions.match(re);
  dims.shift();
  return dims.map( dim => parseInt(dim) );
}

function getMinSide(lengths) {
  let twoSmallestSide = getTwoSmallestSide(lengths);
  return twoSmallestSide[0] * twoSmallestSide[1];
}

function getTwoSmallestSide (lengths) {
  let copiedLengths = lengths.map( x => x);
  let max = Math.max(...copiedLengths);
  copiedLengths.splice(copiedLengths.findIndex( x => x === max), 1);
  return copiedLengths;
}

export default wrapper;
