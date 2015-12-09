export default function (floorsCode) {
  if (floorsCode === '') return 0;
  let state = 0;
  
  for (let paren of floorsCode) {
    if (paren === '(') {
      state++;
    }
    else {
      state--
    }
  }
  console.log('state:', state);
  return state;
}
