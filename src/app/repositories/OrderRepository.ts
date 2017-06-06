import { Order } from '../interfaces/Order.interface';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { OrderModel } from '../models/OrderModel';
import { OrderMapper } from '../mappers/OrderMapper';
import { Fuel } from '../interfaces/Fuel.interface';

@Injectable()
export class OrderRepository {
  private readonly url = 'http://localhost:8085/api';

  constructor(
    private $authHttp: AuthHttp
  ) {}

  public createOrder(orderForm: Order): Promise<any> {
    return this.$authHttp.post(this.url + '/order', orderForm)
      .toPromise()
      .then((response: any) => response.json());
  }

  public getOrders(): Promise<Array<OrderModel>> {
    return this.$authHttp.get(this.url + '/order')
      .toPromise()
      .then((response: any) => response.json())
      .then((response: any) => {
        return response.orderList.map((data: any) => {
          return new OrderMapper().mapDataToModel(data);
        });
      });
  }

  public getUserOrders(): Promise<Array<OrderModel>> {
    return this.$authHttp.get(this.url + '/order/user/')
      .toPromise()
      .then((response: any) => response.json())
      .then((response: any) => {
        return response.orderList.map((data: any) => {
          return new OrderMapper().mapDataToModel(data);
        });
      });
  }

  public finishOrder(id: string): Promise<any> {
    return this.$authHttp.get(this.url + '/order/finish/' + id)
      .toPromise()
      .then((response: any) => response.json());
  }

  public setFuel(id: string, fuelForm: Fuel): Promise<any> {
    return this.$authHttp.post(this.url + '/order/fuel/' + id, fuelForm)
      .toPromise()
      .then((response: any) => response.json());
  }
}
