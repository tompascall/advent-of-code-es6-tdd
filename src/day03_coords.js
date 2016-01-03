class Coords {
  constructor (x = 0, y = 0) {
    this.current = {
      x: x,
      y: y
    };

    this.savedCoords = {
      [x + ';' + y]: 1
    };
  }
  
  get currentCoords () {
    return this.current;
  }

  set currentCoords (c) {
    this.current.x = c.x;
    this.current.y = c.y;
  }

  saveCoord () {
    let currentPositionString = this.current.x + ';' + this.current.y;
    let countOfCurrent = this.savedCoords[currentPositionString] || 0;
    this.savedCoords[currentPositionString] = ++countOfCurrent; 
  }

  move (direction) {
    switch (direction) {
      case '<':
        this.current.x--;
      break;
      case '>':
        this.current.x++;
      break;
      case '^':
        this.current.y++;
      break;
      case 'v':
        this.current.y--;
      break;
    }
  }

  travel (route) {
    for (let direction of route) {
      this.move(direction);
      this.saveCoord();
    }
  }

  countDiffLocations () {
    return Object.keys(this.savedCoords).length;
  }
}

export default Coords;
