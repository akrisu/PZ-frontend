import { Component, OnInit } from '@angular/core';
import { DriverForm } from '../../forms/DriverForm';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  public driverForm: DriverForm;

  constructor() {
    this.driverForm = new DriverForm();
  }

  ngOnInit() {
  }

  public send(): void {
    console.log(this.driverForm);
  }
}
