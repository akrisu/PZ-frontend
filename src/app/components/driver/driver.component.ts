import { Component, OnInit } from '@angular/core';
import { DriverForm } from '../../forms/DriverForm';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { DriverRepository } from '../../repositories/DriverRepository';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  public driverForm: DriverForm;
  public dateOptions: DatePickerOptions;
  public date: DateModel;

  constructor(
    private driverRepository: DriverRepository
  ) {
    this.driverForm = new DriverForm();
    this.dateOptions = new DatePickerOptions();
  }

  ngOnInit() {
  }

  public send(): void {
    this.driverForm.workStartDate = new Date(this.date.formatted);
    console.log(this.driverForm);
    this.driverRepository.createDriver(this.driverForm);
  }
}
