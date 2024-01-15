import { regionToNHSRegion, getChangeDirection } from '@/app/lib/clean-data';

describe('NHS region mapping', () => {
  it('correctly maps Midlands regions', () => {
    expect(regionToNHSRegion('East Midlands')).toBe('Midlands');
    expect(regionToNHSRegion('West Midlands')).toBe('Midlands');
  });

  it('correctly maps North East and Yorkshire regions', () => {
    expect(regionToNHSRegion('North East')).toBe('North East and Yorkshire');
    expect(regionToNHSRegion('Yorkshire and The Humber')).toBe(
      'North East and Yorkshire'
    );
  });

  it('correctly maps other regions such as London', () => {
    expect(regionToNHSRegion('London')).toBe('London');
    expect(regionToNHSRegion('South East')).toBe('South East');
  });
});

describe('Change direction', () => {
  it('returns "UP" when value is positive', () => {
    expect(getChangeDirection(10)).toBe('UP');
    expect(getChangeDirection(100)).toBe('UP');
  });

  it('returns "SAME" when value is zero', () => {
    expect(getChangeDirection(0)).toBe('SAME');
  });

  it('returns "DOWN" when value negative', () => {
    expect(getChangeDirection(-10)).toBe('DOWN');
    expect(getChangeDirection(-100)).toBe('DOWN');
  });
});
