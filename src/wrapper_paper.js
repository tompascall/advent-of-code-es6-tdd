var wrapper = {};

wrapper.calc = function (boxDimensions) {
  let boxes = getBoxes(boxDimensions);
  let result = {
    paper: 0,
    ribbon: 0
  };

  for (let box of boxes) {
    let oneBoxResult = calcOneBox(box);
    result.paper += oneBoxResult.paper;
    result.ribbon += oneBoxResult.ribbon;
  }
  return result;
};

function getBoxes(boxDimensions) {
  return boxDimensions.split('\n');
}

function calcOneBox (box) {
  let lengths = getSideLengths(box);
  let minSideSurface = getMinSideSurface(lengths);
  let result = {
    paper: minSideSurface + 2 * (lengths[0] * lengths[1] + lengths[0] * lengths[2] + lengths[1] * lengths[2]),
    ribbon: getMinPerimeter(lengths) + getCubic(lengths)
  }; 
  return result;
}

function getCubic (lengths) {
  return lengths.reduce( (prev, curr) => prev * curr, 1);
}

function getMinPerimeter(lengths) {
  let twoSmallestSide = getTwoSmallestSide(lengths);
  return 2 * (twoSmallestSide[0] + twoSmallestSide[1]);
}

function getSideLengths (boxDimensions) {
  let re = /(\d+)x(\d+)x(\d+)/;
  let dims = boxDimensions.match(re);
  dims.shift();
  return dims.map( dim => parseInt(dim) );
}

function getMinSideSurface(lengths) {
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
