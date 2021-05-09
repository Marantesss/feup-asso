const getMeaningOfLife = require('./functions');

function aux() {
  if(getMeaningOfLife() > 0)
    return 2;

  return 41;
}

export default aux;
