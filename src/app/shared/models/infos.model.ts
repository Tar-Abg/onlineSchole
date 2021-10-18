export interface Month {
  id: number;
  name: string;
  shortName: string;
  days: number;
  daysLeapYear: number;
}

export interface Country {
  id: number;
  iso: string;
  name: string;
  nameLowerCase: string;
  iso3: string;
  numCode: number;
  phoneCode: number;
}

export interface DaysOfWeek {
  id: number;
  name: string;
  shortName: string;
}

export interface HoursOfDay {
  id: number;
  time: string;
}

