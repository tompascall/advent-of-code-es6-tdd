var xanta = {};

xanta.getDestination = function (floorsCode) {
  if (floorsCode === '') return 0;
  
  let state, 
      index = 0, 
      checkBasement = true;
  
  for (state of getFloor(floorsCode)) {
    index++;
    if (state === -1 && checkBasement) {
      console.log(`Xanta is at the basement for the first time at the ${index}. step.`);
      checkBasement = false;
    }
  }
  return state;
};

function* getFloor (floorsCode) {
  let state = 0;

  for (let paren of floorsCode) {
    if (paren === '(') {
      state++;
    }
    else {
      state--;
    }
    yield state;
  }
}

export default xanta;
