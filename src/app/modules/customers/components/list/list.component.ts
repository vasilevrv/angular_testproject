import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Customer} from '../../model/customer';
import {CustomerService} from '../../services/customer.service';
import {CreateComponent} from '../create/create.component';
import {EditComponent} from '../edit/edit.component';
import {RemoveComponent} from '../remove/remove.component';
import {merge} from 'lodash';
import {Pagination} from '../../../../model/pagination/pagination';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchCustomer} from '../../model/request/search-customer';

@Component({
  selector: 'app-customers-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;

  customers: Customer[] = [];

  pagination: Pagination|null = null;

  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>([]);

  displayedColumns = ['id', 'firstName', 'lastName', 'birthDate', 'gender', 'email', 'address', 'actions'];

  request: SearchCustomer = {
    value: '',
    orderBy: 'id',
    direction: 'desc',
    page: 0,
    limit: 20,
  };

  constructor(private service: CustomerService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      value: ['']
    });

    this.search();

  }

  search(): void {
    this.service.search(this.request).then(result => {
      this.customers = result.items;
      this.pagination = result.meta;
      this.dataSource.data = result.items;
      this.paginator.pageIndex = result.meta.page;
      this.paginator.pageSize = result.meta.limit;
      this.paginator.length = result.meta.total;
    });
  }

  create(): void {
    const dialogRef = this.dialog.open(CreateComponent, {width: '500px'});
    dialogRef.afterClosed().subscribe((result: {customer: Customer}) => {
      this.customers.unshift(result.customer);
      this.dataSource.data = this.customers;
    });
  }

  edit(customer: Customer): void {
    const dialogRef = this.dialog.open(EditComponent, {data: {customer}});
    dialogRef.afterClosed().subscribe((result: {customer: Customer}) => {
      if (result) {
        merge(customer, result.customer);
      }
    });
  }

  remove(customer: Customer): void {
    const dialogRef = this.dialog.open(RemoveComponent, {data: {customer}});
    dialogRef.afterClosed().subscribe((result: {deleted: boolean}) => {
      const idx = this.customers.indexOf(customer);
      if (-1 !== idx) {
        this.customers.splice(idx, 1);
        this.dataSource.data = this.customers;
      }
    });
  }

  onChange(e: PageEvent): void {
    this.request.page = e.pageIndex;
    this.request.limit = e.pageSize;
    this.search();
  }

  shortChange(e: Sort): void {
    this.request.orderBy = e.active;
    this.request.direction = e.direction;
    this.search();
  }

  submit(): void {
    this.request.value = this.form.value.value;
    if (this.request.page !== 0) {
      this.paginator.firstPage();
      return;
    }
    this.search();
  }
}
