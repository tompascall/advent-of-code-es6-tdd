export default class Routes {
  constructor (input) {
    let rows = input.split('\n');
    this.dic = this.createDic(rows);
    this.cities = this.getCities(this.dic);
  }

  createDic (rows) {
    let dic = {};
    let reg = /(\w+) to (\w+) = (\d+)/;
    for (let row of rows) {
      let hits = row.match(reg);
      if (hits) {
        if (!dic[ hits[1] ]) {
          dic[ hits[1] ] = {};
        }
        if (!dic[ hits[2] ]) {
          dic[ hits[2] ] = {};
        }
        dic[ hits[1] ][ hits[2] ] = Number(hits[3]);
        dic[ hits[2] ][ hits[1] ] = Number(hits[3]);
      }
    }
    return dic;
  }

  getCities (dic) {
    return Object.keys(dic);
  }

  *getFiller (puffer, index, copy) {
    for (let i = 0; i < copy.length; i++) {
      puffer[index] = copy[i];
      let anotherCopy = copy.map( x => x );
      anotherCopy.splice(i, 1);
      if (index < this.cities.length - 1) {
        let innerFiller = this.getFiller(puffer, index + 1, anotherCopy);
        yield* innerFiller;
      }
      else yield puffer;
    }
  }
  
  
  *getVariator (cities) {
    
    let puffer = [],
        index = 0,
        copy = cities.map( x => x ),
        filler = this.getFiller(puffer, index, copy);
    
    yield* filler;
  }

  getRoutes () {
    let cities = this.cities.map(x => x),
        variator = this.getVariator(cities),
        routes = {};
    while ( cities = variator.next().value ) {
      routes[this.createRouteName(cities)] = this.countRouteLength(cities);
    } 
    return routes;

  }


  createRouteName (cities) {
    return cities.join('_');
  }

  countRouteLength (cities) {
    let len = 0,
        curr,
        next;
    for (let i = 0; i < cities.length - 1; i++) {
      curr = cities[i];
      next = cities[i + 1];
      len += this.dic[curr][next]
    }
    return len;
  }

  getShortestRoute (allRoutes) {
    let keys = Object.keys(allRoutes);
    let lengths = keys.map( key => {
      return allRoutes[key];
    });
    return Math.min(...lengths);
  } 

  getLongestRoute (allRoutes) {
    let keys = Object.keys(allRoutes);
    let lengths = keys.map( key => {
      return Number(allRoutes[key]);
    });
    return Math.max(...lengths);
  } 
}
