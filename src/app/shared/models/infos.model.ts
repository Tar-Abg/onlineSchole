export interface Month {
  id: number;
  name: string;
  shortName: string;
  numberInString: string;
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

export interface StudentLevel {
  id: number;
  description: string;
  checked: boolean;
}

export interface Categories {
  id: number;
  categoryName: string;
}
export interface Subjects {
  id: number;
  subjectName: string;
  categoryId: number;
}
export interface Level {
  id: number;
  level: string;
  orderNumber: number;
}

export interface StudentAvailableHours {
  id: number;
  description: string;
  details: number;
}

export interface States {
  id: number;
  code: string;
  name: string;
}

export interface TimeZones {
  id: string;
  displayName: string;
}
