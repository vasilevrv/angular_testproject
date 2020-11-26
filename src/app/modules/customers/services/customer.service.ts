import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateCustomer } from '../model/request/create-customer';
import {Customer} from '../model/customer';
import {UpdateCustomer} from '../model/request/update-customer';
import {PaginatedResult} from '../../../model/pagination/paginated-result';
import {SearchCustomer} from '../model/request/search-customer';
import {NgProgress} from 'ngx-progressbar';

@Injectable()
export class CustomerService {

  public endpoint = '/api/v1/customers';

  constructor(private http: HttpClient, private progress: NgProgress) {}

  search(request: SearchCustomer): Promise<PaginatedResult<Customer>> {

    const barRef = this.progress.ref('progressBar');
    const promise = this.http.get<PaginatedResult<Customer>>(this.endpoint, {params: {
      value: request.value,
      orderBy: request.orderBy,
      direction: request.direction,
      page: request.page.toString(),
      limit: request.limit.toString()
    }}).toPromise();

    barRef.start();
    promise.then(() => barRef.complete(), () => barRef.destroy());

    return promise;
  }

  create(request: CreateCustomer): Promise<Customer> {

    const barRef = this.progress.ref('progressBar');
    const promise = this.http.post<Customer>(this.endpoint, {
      firstName: request.firstName,
      lastName: request.lastName,
      birthDate: request.birthDate.format('YYYY-MM-DD'),
      gender: request.gender,
      email: request.email,
      address: request.address
    }).toPromise();

    barRef.start();
    promise.then(() => barRef.complete(), () => barRef.destroy());

    return promise;
  }

  update(id: number, request: UpdateCustomer): Promise<Customer> {

    const barRef = this.progress.ref('progressBar');
    const promise = this.http.put<Customer>(this.endpoint + '/' + id, {
      firstName: request.firstName,
      lastName: request.lastName,
      birthDate: request.birthDate.format('YYYY-MM-DD'),
      gender: request.gender,
      email: request.email,
      address: request.address
    }).toPromise();

    barRef.start();
    promise.then(() => barRef.complete(), () => barRef.destroy());

    return promise;
  }

  remove(id: number): Promise<void> {
    const barRef = this.progress.ref('progressBar');
    const promise = this.http.delete<void>(this.endpoint + '/' + id).toPromise();
    barRef.start();
    promise.then(() => barRef.complete(), () => barRef.destroy());

    return promise;
  }
}
