import { TimeSpan } from '.';


describe('elapsedDays', () => {
  it('elapsedDays: Defaults', () => {
    const startDate = '2020-01-01';
    const endDate = '2020-01-31';

    const [elapsedYears, elapsedDays] = TimeSpan(startDate, endDate);
    expect(elapsedYears).toEqual(0);
    expect(elapsedDays).toEqual(30);
  });

  // TODO: [V1] Add a test that hits the `if (elapsedDays)` branch
});
