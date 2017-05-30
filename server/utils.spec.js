import { getBoundingBox } from './utils';

describe('getBoundingBox', () => {
  const expected = [-118.56539316431528, 33.831308141921994, -118.2163568356847, 34.120753858078004]; // eslint-disable-line max-len
  test('returns correct bounds for a location + distance', () => {
    expect(getBoundingBox([33.976031, -118.390875], 10)).toEqual((expect.arrayContaining(expected))); // eslint-disable-line max-len
    expect(getBoundingBox([33.976031, -118.390875], 10)).toHaveLength(4);
  });
});
