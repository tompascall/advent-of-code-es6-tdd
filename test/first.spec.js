import { echo } from '../src/first';

describe('First test', () => {
    it('should be ok', () => {
    sinon.spy(window.console, 'log');
    echo('asdf');
    expect(window.console.log.called).to.equal(true);
    window.console.log.restore();
  });
});
