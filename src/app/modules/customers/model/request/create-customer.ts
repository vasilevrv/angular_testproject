import {Moment} from "moment";

export interface CreateCustomer {
  firstName: string;
  lastName: string;
  birthDate: Moment;
  gender: string;
  email: string;
  address: string;
}
