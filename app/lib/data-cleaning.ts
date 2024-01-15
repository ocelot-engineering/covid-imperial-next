import {
  RegionAreaName,
  NHSAreaName,
  ChangeDirection,
} from '@/app/types/types';

/**
 * Maps a region area name to an NHS area name.
 *
 * @param areaName The region area name to map.
 * @returns NHS region.
 */
export function regionToNHSRegion(areaName: RegionAreaName): NHSAreaName {
  switch (decodeURIComponent(areaName)) {
    case 'East Midlands':
    case 'West Midlands':
      return 'Midlands';
    case 'North East':
    case 'Yorkshire and The Humber':
      return 'North East and Yorkshire';
  }

  // @ts-ignore
  return areaName;
}

/**
 * Maps a number to an allowed change direction.
 *
 * @param value - The value to determine the change direction for.
 * @returns change direction string.
 */
export function getChangeDirection(value: number): ChangeDirection {
  if (value > 0) {
    return 'UP';
  }
  if (value < 0) {
    return 'DOWN';
  }

  return 'SAME';
}
