import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { Driver } from '../../interfaces/Driver.interface';
import { DriverRepository } from '../../repositories/DriverRepository';
import { DriverModel } from '../../models/DriverModel';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  public driver: Driver;
  public dateOptions: DatePickerOptions;
  public driverForm: FormGroup;
  public drivers: Array<DriverModel>

  constructor(
    private driverRepository: DriverRepository,
    private formBuilder: FormBuilder,
  ) {
    this.dateOptions = new DatePickerOptions();
  }

  ngOnInit() {
    this.driverForm = this.formBuilder.group({
      firstName: ['', [<any>Validators.required, Validators.minLength(2)]],
      lastName: ['', [<any>Validators.required, Validators.minLength(2)]],
      workerId: ['', [<any>Validators.required]],
      phone: ['', [<any>Validators.required]],
      workStartDate: ['']
    });

    this.getDrivers();
  }

  public delete(id: string): void {
    this.driverRepository.deleteVehicle(id)
    .then(() => {
      Materialize.toast('Deleted', 4000);

      this.driverForm.reset();
      this.getDrivers();
    })
    .catch((response) => {
      Materialize.toast('Error', 4000);
    });
  }

  public send(model: Driver, isValid: boolean): void {
    if (isValid) {
      model.workStartDate = this.driverForm.value['workStartDate'].formatted;
      this.driverRepository.createDriver(model)
      .then(() => {
        Materialize.toast('Saved', 4000);
      })
      .catch((response) => {
        if (response.status === 400) {
          Materialize.toast('Error! Form is filled incorrectly', 4000);
        }
      });
    }

    this.getDrivers();
  }

  private getDrivers(): void {
    this.driverRepository.getDrivers()
    .then((driverList: Array<DriverModel>) => {
      this.drivers = driverList;
    });
  }
}
