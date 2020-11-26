import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../../services/customer.service';
import {Customer} from '../../model/customer';
import * as moment from 'moment';
import {Validators as CustomValidators} from '../../../common/validators/validators';

@Component({
  selector: 'app-customer-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  public form: FormGroup;

  public genders = [{name: 'Man', value: 0}, {name: 'Woman', value: 1}];

  public customer: Customer;

  constructor(private service: CustomerService,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditComponent>,
              @Inject(MAT_DIALOG_DATA) data: {customer: Customer}) {

    this.customer = data.customer;

    this.form = this.formBuilder.group({
      firstName: [data.customer.firstName, [Validators.required, Validators.maxLength(100)]],
      lastName: [data.customer.lastName, [Validators.required, Validators.maxLength(100)]],
      birthDate: [moment(data.customer.birthDate.split('T')[0]), [
        Validators.required, CustomValidators.greaterThan(-60, 'years'), CustomValidators.lessThan(-18, 'years')]],
      gender: [data.customer.gender, [Validators.required]],
      email: [data.customer.email, [Validators.required, Validators.email]],
      address: [data.customer.address, [Validators.maxLength(200)]]
    });
  }

  submit(): void {
    this.service.update(this.customer.id, this.form.value).then(customer => {
      this.dialogRef.close({customer});
    });
  }
}
