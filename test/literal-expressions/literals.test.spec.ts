import { expect } from 'chai';
import { feel } from '../dist/feel';
describe('literal expression tests', () => {
  it('should execute a decision containing a literal expression correctly', done => {
    engine.executeDecisions(dmnXml, ['decision1']);
  });
});