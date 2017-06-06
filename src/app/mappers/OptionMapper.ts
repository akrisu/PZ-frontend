import { OptionModel } from '../models/OptionModel';

export class OptionMapper {
  public mapDriverToOptionModel(data: any) {
    return new OptionModel(data.firstName + ' ' + data.lastName, data.id);
  }
}
