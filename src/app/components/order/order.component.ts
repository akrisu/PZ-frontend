import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DriverRepository } from '../../repositories/DriverRepository';
import { OrderRepository } from '../../repositories/OrderRepository';
import { DriverModel } from '../../models/DriverModel';
import { OptionModel } from '../../models/OptionModel';
import { OptionMapper } from '../../mappers/OptionMapper';
import { Driver } from '../../interfaces/Driver.interface';
import { Order } from '../../interfaces/Order.interface';
import { OrderModel } from '../../models/OrderModel';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public avaliableDrivers: Array<DriverModel>;
  public orderForm: FormGroup;
  public options: Array<OptionModel>;
  public orders: Array<OrderModel>;

  constructor(
    private driverRepository: DriverRepository,
    private orderRepository: OrderRepository,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getAvaliableDrivers();
    this.getOrders();

    this.orderForm = this.formBuilder.group({
      start: ['', [<any>Validators.required]],
      end: ['', [<any>Validators.required]],
      loadVolume: ['', [<any>Validators.required]],
      loadCapacity: ['', [<any>Validators.required]],
      driver: ['', [<any>Validators.required]],
    });
  }

  public send(model: Order, valid: boolean ): void {
    if (valid) {
      this.orderRepository.createOrder(model)
      .then(() => {
        Materialize.toast('Saved', 4000);

        this.orderForm.reset();
        this.getOrders();
      })
      .catch((response) => {
        Materialize.toast('Error! ' + response._body, 4000);
      });
    }
  }

  public finish(id: string): void {
    this.orderRepository.finishOrder(id)
    .then(() => {
      Materialize.toast('Saved', 4000);

      this.getOrders();
      this.getAvaliableDrivers();
    })
    .catch(()=> {
      Materialize.toast('Error!', 4000);
    });
  }

  private getOrders(): void {
    this.orderRepository.getOrders()
    .then((orderList: Array<OrderModel>) => {
      this.orders = orderList;
    });
  }

  private getAvaliableDrivers(): void {
    this.driverRepository.getAvaliableDrivers()
    .then((drivers: Array<DriverModel>) => {
      this.avaliableDrivers = drivers;

      this.options = this.avaliableDrivers.map((driver: DriverModel) => new OptionMapper().mapDriverToOptionModel(driver));
    });
  }
}
