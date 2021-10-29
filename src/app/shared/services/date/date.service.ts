import { Injectable } from '@angular/core';
import {KeyValuePair} from "../../models/keyValuePair.model";

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getYears(startYear: number): KeyValuePair[] {
    let yearList: KeyValuePair[] = [];
    const thisYear = new Date().getFullYear();
    let year = startYear;
    while (year <= thisYear ) {
      yearList.push({id: year, description: year.toString()});
      year++
    }
    return yearList
  }
}