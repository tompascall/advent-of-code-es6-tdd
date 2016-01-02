import Routes from '../src/day9_routes';

describe('test 1st part of 9th puzzle', () => {
  let routes,
      input = `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`;

  beforeEach( () => {
    routes = new Routes(input);  
  });

  it('should make a dictionary of cities', () => {
    expect(Object.keys(routes.dic).length).to.equal(3);
    expect(routes.dic.London.Dublin).to.equal(464);
    expect(routes.dic.Dublin.London).to.equal(464);
    expect(routes.dic.London.Belfast).to.equal(518);
    expect(routes.dic.Belfast.London).to.equal(518);
    expect(routes.dic.Dublin.Belfast).to.equal(141);
    expect(routes.dic.Belfast.Dublin).to.equal(141);
  }); 

  it('should make an array of object keys', () => {
    let tester = routes.getCities(routes.dic);
    expect(tester.length).to.equal(3);
    expect(tester.indexOf('London')).not.to.equal(-1);
    expect(tester.indexOf('Dublin')).not.to.equal(-1);
    expect(tester.indexOf('Belfast')).not.to.equal(-1);
    expect(tester).to.deep.equal(routes.cities);
  });

  it('should variate array', () => {
    let tester = ['London', 'Belfast', 'Dublin'];
    let variator = routes.getVariator(tester);
    expect(variator.next().value).to.deep.equal(['London', 'Belfast', 'Dublin']);
    expect(variator.next().value).to.deep.equal(['London', 'Dublin', 'Belfast']);
    expect(variator.next().value).to.deep.equal(['Belfast', 'London', 'Dublin']);
    expect(variator.next().value).to.deep.equal(['Belfast', 'Dublin', 'London']);
    expect(variator.next().value).to.deep.equal(['Dublin', 'London', 'Belfast']);
    expect(variator.next().value).to.deep.equal(['Dublin', 'Belfast', 'London']);
  });

  it('should iterate through variations and save the sequence and route length into an object', () => {
    let allRoutes = routes.getRoutes();
    expect(allRoutes.London_Belfast_Dublin).to.equal(659);
    expect(allRoutes.Belfast_London_Dublin).to.equal(982);
    expect(allRoutes.Belfast_Dublin_London).to.equal(605);
    expect(allRoutes.London_Dublin_Belfast).to.equal(605);
    expect(allRoutes.Dublin_London_Belfast).to.equal(982);
    expect(allRoutes.Dublin_Belfast_London).to.equal(659);
  });

  it('should get the shortest route', () => {
    let allRoutes = routes.getRoutes();
    expect(routes.getShortestRoute(allRoutes)).to.equal(605);
  });

  it('should get the longest route', () => {
    let allRoutes = routes.getRoutes();
    expect(routes.getLongestRoute(allRoutes)).to.equal(982);
  });
});
