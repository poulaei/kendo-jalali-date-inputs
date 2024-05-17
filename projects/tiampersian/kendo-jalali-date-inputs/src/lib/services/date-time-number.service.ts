import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import dayjs from 'dayjs';
import { IConfig } from '../models/config.model';


@Injectable({
  providedIn: 'root'
})
export class DateTimeNumberService {
  usePersianNumber: boolean;

  constructor(
    @Inject(LOCALE_ID) localeId: string,
    @Optional() @Inject('DATE_INPUT_CONFIGS') private configs: IConfig
  ) {
    this.setLocaleId(localeId);
    this.init();
  }

  setLocaleId(value: string) {
    this.usePersianNumber = value === 'fa' || value === 'fa-IR';
  }

  init() {
    if (this.configs?.usePersianNumber === false) {
      return;
    }
    const me = this;
     //dayjs.localeData().months();
    const te = dayjs.prototype.format;
    dayjs.prototype.format = function (format) {

      return te.call(this, format);
      // if (!me.usePersianNumber) {
      //   //Commented by poulaei
      //   //نمایش اعداد به شکل انگلیسی در تقویم
      //   return te.call(this, format);
      // }
      //
      // let result = te.call(this, format);
      // result = result.toPerNumber().replace(/,/g, '،');
      // return result;
    };
  }
}
