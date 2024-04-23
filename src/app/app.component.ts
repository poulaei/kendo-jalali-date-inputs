import { RTL } from '@progress/kendo-angular-l10n';
import { ChangeDetectorRef, Component, Inject, LOCALE_ID, Injector } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { DatePickerType, JalaliCldrIntlService } from '@tiampersian/kendo-jalali-date-inputs';
import dayjs from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
  ],

})
export class AppComponent {
  title = 'kendo-jalali-date-inputs';
  __todayDate = new Date();
  max = new Date(
    this.__todayDate.getFullYear(),
    this.__todayDate.getMonth(),
    this.__todayDate.getDate(),
    23, 59, 59, 999
  );

  public value: Date = null;
  rerender = true;
  locales = ['fa-IR', 'fa', 'en-US', 'en'];
  calendarTypes = Object.values(DatePickerType);
  calendarType = '';
  currentLocaleId = '';
  range = {
    start: null,
    end: null
  }
  constructor(
    @Inject(IntlService) private localeService: JalaliCldrIntlService,
    private cdr: ChangeDetectorRef
  ) {
    this.calendarType = localeService.isJalali ? DatePickerType.jalali : DatePickerType.gregory;
    this.currentLocaleId = localeService.localeId;
  }

  changeCalendarType(value: string): void {
    localStorage.setItem('locale', value);
    this.calendarType = value;
    this.localeService.toggleType();
    this.localeService.reload();
    // this.reload();

  }
  private reload(): void {
    // this.rerender = false;
    this.cdr.detectChanges();
    this.rerender = true;
  }

  changeLocaleId(value: any): void {
    localStorage.setItem('localeId', value);
    this.localeService.changeLocaleId(value);
    this.localeService.reload();
    this.currentLocaleId = value;
  }

  changeValue($event: any): void {
    this.value = $event;
  }

  getJalaliValue() {
    if (!this.value) return null;

    return dayjs(this.value).calendar('jalali').locale(this.currentLocaleId).format('ddd DD MMMM YYYY hh:mm:ss')
  }
}

