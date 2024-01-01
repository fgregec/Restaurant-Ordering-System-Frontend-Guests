import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-table-picker',
  templateUrl: './table-picker.component.html',
})
export class TablePickerComponent {
  bsConfig?: Partial<BsDatepickerConfig>;
  
  @ViewChild('people') people!:ElementRef;
  @Output() validationSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  selectedDate?: Date;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  myTime: Date = new Date();
  minTime: Date = new Date();
  maxTime: Date = new Date();
  timeNow: Date = new Date();

  errorMessage?: string;
  showErrorAlert?: boolean = false;

  constructor() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.bsConfig = {
      minDate: new Date(),
      showWeekNumbers: false,
    };

    this.myTime.setHours(10);
    this.myTime.setMinutes(0);
    this.minTime.setHours(10);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(20);
    this.maxTime.setMinutes(0);
  }

  onValueChange(value: Date): void {
    this.selectedDate = value;
  }

  validateTable() {
    this.timeNow = new Date();
    const timeNowNumber: number = this.timeNow.getHours() + 1;

    if (this.people.nativeElement.value <= 0) {
      this.showErrorAlert = true;
      this.errorMessage = 'Number of people can not be 0';
      return;
    } else {
      this.showErrorAlert = false;
    }

    if (!this.selectedDate) {
      this.showErrorAlert = true;
      this.errorMessage = 'Please select a date!';
      return;
    } else {
      this.showErrorAlert = false;
    }

    if (
      this.myTime.getHours() < timeNowNumber &&
      this.myTime.getDate() == this.selectedDate.getDate()
    ) {
      this.showErrorAlert = true;
      this.errorMessage = 'You have to order 1 hour in advance!';
      return;
    } else {
      this.showErrorAlert = false;
    }

    this.validationSuccess.emit(true);
  }
}
