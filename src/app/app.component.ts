import {ChangeDetectorRef, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {IntlService} from '@progress/kendo-angular-intl';
import {
    DatePickerType, getDateFormatString,
    JalaliCldrIntlService,
    KendoJalaliDateInputsModule,
} from '@tiampersian/kendo-jalali-date-inputs';
import {KendoInput} from "@progress/kendo-angular-common";
import {DOCUMENT} from "@angular/common";
import {DateInputComponent, DatePickerComponent} from "@progress/kendo-angular-dateinputs";
import {isPresent} from "../../projects/tiampersian/kendo-jalali-date-inputs/src/lib/services/kendo-util-overrides";
import jalaliday from "jalaliday";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [],

})
export class AppComponent {

    @ViewChild('date', {static: true}) ktAsideScroll: any;
    title = 'kendo-jalali-date-inputs';
    public value: Date = null;
    rerender = true;
    locales = ['fa-IR', 'fa', 'en-US', 'en'];
    calendarTypes = Object.values(DatePickerType);
    calendarType = '';
    currentLocaleId = '';
    @ViewChild(DatePickerComponent) dp!: DatePickerComponent;
    constructor(
        @Inject(IntlService) public localeService: JalaliCldrIntlService,
        private cdr: ChangeDetectorRef,
        private ddd: KendoJalaliDateInputsModule
    ) {
        //console.log("constructor=========", localeService);
        this.calendarType = localeService.isJalali ? DatePickerType.jalali : DatePickerType.gregory;
        this.currentLocaleId = localeService.localeId;
    }

    changeCalendarType(value: string): void {
        localStorage.setItem('locale', value);
        //console.log(this.localeService);
        this.calendarType = value;
        this.localeService.toggleType();
        this.localeService.reload();
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
    changeValue(event: any): void {
        // this.cdr.detectChanges();
        // this.value = $event;
    }
    public setToNull() {
        console.log("Value = ",this.value);
        console.log(this.dp.value);
        this.dp.value = null;
        this.cdr.detectChanges()
        console.log(this.dp.value);
    }
    protected readonly DatePickerType = DatePickerType;
    protected readonly jalaliday = jalaliday;
}

