import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { h2019, h2018, h2017, h2016 } from './holidays';

@Injectable({
  providedIn: 'root',
})
export class WDCalulatorService {
  constructor() {}
  holidayArray = [];
  fromtoCount(fromDay:string, toDay:string, includeHoliday: boolean) {

    const span =
      Math.abs(Date.parse(fromDay) - Date.parse(toDay)) / 1000 / 60 / 60 / 24;
    const fromWD = new Date(fromDay).getDay();
    const toWD = new Date(toDay).getDay();
    let restDay = 0;
    let holiday = 0;
    let holiArray = [];
    for (let i = 0; i < span; i++) {
      if ((fromWD + i) % 7 === 0 || (fromWD + i) % 7 === 6) {
        restDay++;
      }
      let theDay = this.dateFlow(fromDay,i);
      const theYear = theDay.getFullYear();

      switch (theYear) {
        case 2019:
          holiArray = h2019;
          break;
        case 2018:
          holiArray = h2018;
          break;
        case 2017:
          holiArray = h2017;
          break;
        case 2016:
          holiArray = h2016;
          break;
      }

      if (holiArray.includes(new Date(theDay).toLocaleDateString())) {
        holiday++;
      }
    }

    return span - restDay - holiday;
  }
  dateFlow(fromDay:string,i) {
    const inputDay=new Date(fromDay);
    return new Date(inputDay.setDate(inputDay.getDate()+i));
    
  }
}
