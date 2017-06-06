
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { OrderRepository } from '../../repositories/OrderRepository';
import { Fuel } from '../../interfaces/Fuel.interface';
import { OrderModel } from '../../models/OrderModel';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() public editId: string;
  public fuel: Fuel;
  public fuelForm: FormGroup;
  public orders: Array<OrderModel>;

  constructor(
    private orderRepository: OrderRepository,
    public formBuilder: FormBuilder,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.fuelForm = this.formBuilder.group({
      fuel: ['', [<any>Validators.required]]
    });

    this.editId = null;
    this.getOrders();
  }

  public send(fuel: Fuel, isValid: boolean) {
    if (isValid) {
      this.orderRepository.setFuel(this.editId, fuel)
      .then(() => {
        Materialize.toast('Saved', 4000);

        this.fuelForm.reset();
        this.editId = null;
        this.getOrders();
      })
      .catch((response) => {
        if (response.status === 400) {
          Materialize.toast('Error! Form is filled incorrectly', 4000);
        }
      });
    }
  }

  public edit(id: string): void {
    this.fuelForm.reset();
    this.editId = id;
  }

  private getOrders(): void {
    this.orderRepository.getOrders()
    .then((orderList: Array<OrderModel>) => {
      this.orders = orderList;
    });
  }

}
