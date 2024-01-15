export type AreaType = 'region' | 'nhsRegion';

export type RegionAreaName =
  | 'East Midlands'
  | 'East of England'
  | 'London'
  | 'North East'
  | 'North West'
  | 'South East'
  | 'South West'
  | 'West Midlands'
  | 'Yorkshire and The Humber';

export type NHSAreaName =
  | 'Midlands'
  | 'East of England'
  | 'London'
  | 'North East and Yorkshire'
  | 'North West'
  | 'South East'
  | 'South West';

export type ChangeDirection = 'UP' | 'DOWN' | 'SAME' | 'NONE';

export interface HeadlineData {
  date: string;
  name?: RegionAreaName;
  code?: string;
  value: number;
  changeNum: number;
  changePerc: number;
  changeDirection: ChangeDirection;
}

export interface CasesByVariantData {
  [key: string]: {
    date: string[];
    newWeeklyPercentage: number[];
  };
}

export interface CaseHistoryItem {
  date: string;
  rollingCases: number;
}
