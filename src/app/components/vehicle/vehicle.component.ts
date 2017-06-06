import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Vehicle } from '../../interfaces/Vehicle.interface';
import { VehicleRepository } from '../../repositories/VehicleRepository';
import { VehicleModel } from '../../models/VehicleModel';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  public vehicle: Vehicle;
  public vehicleForm: FormGroup;
  public vehicles: Array<VehicleModel>;

  constructor(
    private vehicleRepository: VehicleRepository,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.vehicleForm = this.formBuilder.group({
      registrationNumber: ['', [<any>Validators.required, Validators.minLength(5)]],
      volume: ['', [<any>Validators.required]],
      capacity: ['', [<any>Validators.required]]
    });

    this.getVehicles();
  }

  public send(model: Vehicle, isValid: boolean): void {
    if (isValid) {
      this.vehicleRepository.createVehicle(model)
      .then(() => {
        Materialize.toast('Saved', 4000);

        this.vehicleForm.reset();
        this.getVehicles();
      })
      .catch((response) => {
        if (response.status === 400) {
          Materialize.toast('Error! Form is filled incorrectly', 4000);
        }
      });
    }
  }

  public delete(id: string): void {
    this.vehicleRepository.deleteVehicle(id)
      .then(() => {
        Materialize.toast('Deleted', 4000);
        this.getVehicles();
      })
      .catch((response) => {
        Materialize.toast('Error!', 4000);
      });
  }

  private getVehicles(): void {
    this.vehicleRepository.getVehicles()
    .then((vehicleList: Array<VehicleModel>) => {
      this.vehicles = vehicleList;
    });
  }

}
