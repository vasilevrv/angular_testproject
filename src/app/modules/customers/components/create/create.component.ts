import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../../services/customer.service';
import {Validators as CustomValidators} from '../../../common/validators/validators';

@Component({
  selector: 'app-customer-create',
  templateUrl: 'create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  public form: FormGroup;

  constructor(private service: CustomerService,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<CreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      birthDate: [null, [
        Validators.required, CustomValidators.greaterThan(-60, 'years'), CustomValidators.lessThan(-18, 'years')]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.maxLength(200)]]
    });

  }

  submit(): void {
    this.service.create(this.form.value).then(customer => {
      this.dialogRef.close({customer});
    });
  }
}
