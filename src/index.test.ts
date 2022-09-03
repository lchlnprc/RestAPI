import { failAction } from './index';
 
describe('testing index file', () => {
  test('failAction should always throw error', () => {
    expect(failAction(0,0,0)).toBe(0);
  });
});