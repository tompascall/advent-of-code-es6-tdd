let xanta = {};

xanta.getDestination = function (floorsCode) {

  let state = { current: 0}, 
      index = 0, 
      checkBasement = true;

  if (floorsCode === '') return state;

  for (state.current of getFloor(floorsCode)) {
    index++;
    if (state.current === -1 && checkBasement) {
      state.basementStep = index;
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
