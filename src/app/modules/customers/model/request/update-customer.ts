import {Moment} from "moment";

export interface UpdateCustomer {
  firstName: string;
  lastName: string;
  birthDate: Moment;
  gender: string;
  email: string;
  address: string;
}
